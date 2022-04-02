import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";
import { db } from "../utils/init-firebase";
import { collection } from "firebase/firestore";
export default function Registerpage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const toast = useToast();
  const currentUser = useAuth();
  const { register } = useAuth();
  console.log("ligne 71", currentUser);
  const mounted = useMounted();
  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>
      <Card fontSize="2xl" maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your register logic here
            console.log(email, password);
            var EmailVerif = /[a-z0-9._%+-]+@courrier.uqam.ca/i;
            const result = EmailVerif.test(email);
            console.log(result);
            if (result === false) {
              toast({
                description: "email must contain @courrier.uqam.ca",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              setEmail("");
              setPassword("");
              if (!email || !password) {
                toast({
                  description: "Please enter your email or password",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                setEmail("");
                console.log("allo");
              }
            } else if (result === true) {
              console.log(email);
              setIsSubmiting(true);
              register(email, password)
                .then(() => {
                  db.collection("users").doc(currentUser.uid).set(currentUser);
                  console.log("ligne 71", currentUser);
                  history.push("/");
                })

                .catch((error) => {
                  console.log(error.message);
                  toast({
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                })
                .finally(() => mounted.current && setIsSubmiting(false));
            }
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel fontSize="2xl">Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl fontSize="2xl" id="password">
              <FormLabel fontSize="2xl">Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <Button
              isLoading={isSubmiting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="2xl"
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button
            fontSize="2xl"
            variant="link"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() => alert("sign in with google")}
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
