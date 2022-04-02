import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";
import logo from "../img/logo512.png";

export function Navbar() {
  const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      mb={4}
      py={4}
    >
      <HStack
        justifyContent="flex-end"
        maxW="container.lg"
        mx="auto"
        spacing={4}
      >
        <Navlink fontSize="2xl" to="/" name={"home"}></Navlink>

        <Spacer />

        <Spacer></Spacer>
        {!currentUser && <Navlink fontSize="2xl" to="/login" name="Login" />}
        {!currentUser && (
          <Navlink fontSize="2xl" to="/register" name="Register" />
        )}
        {currentUser && <Navlink fontSize="2xl" to="/profile" name="Profile" />}
        {currentUser && (
          <Navlink
            fontSize="2xl"
            to="/logout"
            name="Logout"
            onClick={async (e) => {
              e.preventDefault();
              await logout();
            }}
          />
        )}
        <IconButton
          fontSize="2xl"
          variant="ghost"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
        <Image htmlWidth="120px" src={logo} alt="Study Box" />
      </HStack>
    </Box>
  );
}
