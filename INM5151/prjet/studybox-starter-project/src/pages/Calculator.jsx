import React, { useState, useEffect } from "react";
import {
  Heading,
  Input,
  chakra,
  FormLabel,
  FormControl,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import CalculatorService from "../services/calculator.services";

const AddCourse = ({ id, setCourseId }) => {
  const [cours, setCours] = useState("");
  const [intra, setIntra] = useState("");

  const [final, setFinal] = useState("");
  const [tp1, setTp1] = useState("");
  const [tp2, setTp2] = useState("");
  const [tp3, setTp3] = useState("");
  const [ponderation1, setPonderation1] = useState("");
  const [ponderation2, setPonderation2] = useState("");
  const [ponderation3, setPonderation3] = useState("");
  const [ponderation4, setPonderation4] = useState("");
  const [ponderation5, setPonderation5] = useState("");
  const [moyenne, setMoyenne] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  var Moyenne = () => {
    console.log(intra);
    var moyenne = 0;
    moyenne =
      (intra * ponderation1) / 100 +
      (final * ponderation2) / 100 +
      (tp1 * ponderation3) / 100 +
      (tp2 * ponderation4) / 100 +
      (tp3 * ponderation5) / 100;
    return moyenne;
  };
  var moyenneT = Moyenne();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newCourse = {
      cours: cours,
      intra,
      ponderation1,
      final,
      ponderation2,
      tp1,
      ponderation3,
      tp2,
      ponderation4,
      tp3,
      ponderation5,
      moyenneT,
    };
    console.log(newCourse);

    try {
      if (id !== undefined && id !== "") {
        await CalculatorService.updateBook(id, newCourse);
        setCourseId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await CalculatorService.addCourse(newCourse);
        setMessage({ error: false, msg: "New Course added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const handleReinitialisation = () => {
    setCours("");
    setIntra("");
    setTp1("");
    setTp2("");
    setTp3("");
    setFinal("");
    setPonderation1("");
    setPonderation2("");
    setPonderation3("");
    setPonderation4("");
    setPonderation5("");
  };
  return (
    <Layout>
      <Heading>Calculator</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <FormControl>
          <HStack spacing="20px" mt={5}>
            <FormLabel htmlFor="intra">Nom du cours</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="cours"
              type="text"
              value={cours}
              onChange={(e) => setCours(e.target.value)}
            />
          </HStack>
          <HStack spacing="20px" mt={5}>
            <FormLabel htmlFor="intra">Examen intra</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="intra"
              type="text"
              value={intra}
              onChange={(e) => setIntra(e.target.value)}
            />
            <FormLabel htmlFor="intra">Ponderation</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="ponderation1"
              type="text"
              value={ponderation1}
              onChange={(e) => setPonderation1(e.target.value)}
            />
          </HStack>
          <HStack spacing="20px" mt={5}>
            <FormLabel htmlFor="final">Examen final</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="final"
              type="text"
              value={final}
              onChange={(e) => setFinal(e.target.value)}
            />
            <FormLabel htmlFor="intra">Ponderation</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="ponderation2"
              type="text"
              value={ponderation2}
              onChange={(e) => setPonderation2(e.target.value)}
            />
          </HStack>

          <HStack spacing="10px" mt={5}>
            <FormLabel spacing="100px" ml={10} htmlFor="tp1">
              Tp1
            </FormLabel>

            <Input
              htmlSize={4}
              width="auto"
              id="tp1"
              type="text"
              value={tp1}
              onChange={(e) => setTp1(e.target.value)}
            />

            <FormLabel htmlFor="ponderation">Ponderation</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="ponderation"
              type="text"
              value={ponderation3}
              onChange={(e) => setPonderation3(e.target.value)}
            />
          </HStack>
          <HStack spacing="10px" mt={5}>
            <FormLabel spacing="100px" ml={10} htmlFor="tp1">
              Tp2
            </FormLabel>

            <Input
              htmlSize={4}
              width="auto"
              id="tp1"
              type="text"
              value={tp2}
              onChange={(e) => setTp2(e.target.value)}
            />

            <FormLabel htmlFor="ponderation">Ponderation</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="ponderation"
              type="text"
              value={ponderation4}
              onChange={(e) => setPonderation4(e.target.value)}
            />
          </HStack>
          <HStack spacing="20px" mt={5}>
            <FormLabel spacing="100px" ml={10} htmlFor="tp1">
              Tp3
            </FormLabel>

            <Input
              spacing="40px"
              htmlSize={4}
              width="auto"
              id="tp3"
              type="text"
              value={tp3}
              onChange={(e) => setTp3(e.target.value)}
            />

            <FormLabel htmlFor="ponderation">Ponderation</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="ponderation"
              type="text"
              value={ponderation5}
              onChange={(e) => setPonderation5(e.target.value)}
            />
          </HStack>
          <HStack spacing="20px" mt={10}>
            <FormLabel htmlFor="intra">Moyenne</FormLabel>
            <Input
              htmlSize={4}
              width="auto"
              id="moyenne"
              type="text"
              value={moyenneT}
            />
          </HStack>
        </FormControl>

        <HStack spacing="100px" mt={10}>
          <Button
            onClick={handleReinitialisation}
            type="submit"
            colorScheme="primary"
            size="lg"
            fontSize="2xl"
          >
            Reinitialiser
          </Button>
          <Button type="submit" colorScheme="primary" size="lg" fontSize="2xl">
            Confirm
          </Button>
        </HStack>
      </chakra.form>
    </Layout>
  );
};

export default AddCourse;
