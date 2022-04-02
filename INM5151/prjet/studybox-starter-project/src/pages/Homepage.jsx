import {
  Center,
  Heading,
  Spacer,
  Text,
  Box,
  Grid,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export default function Homepage() {
  const history = useHistory();

  const { currentUser } = useAuth();

  return (
    <Layout>
      <Center bg="#526FF6" h="100px" color="white">
        <Heading>Make Your Study Life Easier To Manage</Heading>
      </Center>

      <Stack direction="row" spacing={4} align="center" mt="40px" ml="20px">
        <Link to="/calcul">
          <Box
            as="button"
            size="md"
            height="200px"
            width="300px"
            bg="#7CE6D7"
            variant="solid"
            fontSize="50px"
            border="10px"
            color="white"
          >
            Calculator
          </Box>
        </Link>

        <Box
          as="button"
          size="md"
          height="200px"
          width="300px"
          bg="#F7DC69"
          variant="solid"
          fontSize="50px"
          border="10px"
          color="white"
        >
          Calendar
        </Box>
        <Link to="/login">
          {" "}
          <Box
            as="button"
            size="md"
            height="200px"
            width="300px"
            bg="#E684C3"
            variant="solid"
            fontSize="50px"
            border="10px"
            color="white"
          >
            Task Manager
          </Box>
        </Link>
      </Stack>
      <Stack spacing={3} mt="40px">
        <Text fontSize="3xl">
          StudyBox is designed with the aim of helping college students achieve
          their academic goals and optimize their study strategies using three
          tools.
        </Text>
      </Stack>
    </Layout>
  );
}
