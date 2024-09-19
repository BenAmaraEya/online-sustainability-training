import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Heading,
  Input,
  VStack,
  Grid,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import imgformation from "../../images/nosformations.jpg"
import NavbarComponent from "../../components/NavbarFront";
const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getFormation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/formation");
        setFormations(response.data);
      } catch (error) {
        console.error("Erreur de récupération des formations", error);
      }
    };

    getFormation();
  }, []);

  const filteredFormations = formations.filter((formation) =>
    formation.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Box bg="blue.400" minH="100vh" py={8}>
    <NavbarComponent />
   
    <Container maxW="container.xl" p={4} bg="white" color="black" borderRadius="lg">
     
      <Box
        bgImage={`url(${imgformation})`}// Use a background image here
        bgSize="cover"
        bgPosition="center"
        p={8}
        borderRadius="lg"
        textAlign="center"
        mb={8}
      >
        <Heading as="h1" size="2xl" color="white">
          Explore Our Courses
        </Heading>
        <Flex justify="center" mt={4}>
          <Input
            placeholder="Search courses..."
            size="lg"
            onChange={(e) => setSearchTerm(e.target.value)}
            width="60%"
            borderRadius="full"
          />
          <Button ml={4} size="lg" colorScheme="blue" borderRadius="full">
            Search
          </Button>
        </Flex>
      </Box>

      {/* Grid of Formations */}
      <Heading as="h3" size="lg" mb={4}>
        Formations
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {filteredFormations.map((formation) => (
          <Box
            key={formation._id}
            as={Link}
            to={`/formationdetails/${formation._id}`}
            p={4}
            border="1px solid #e2e8f0"
            borderRadius="lg"
            _hover={{ boxShadow: "md", transition: "0.3s" }}
          >
            <VStack spacing={2} align="stretch">
              
               {formation.image && <Image src={`http://localhost:5000/${formation.image}`} alt={formation.titre}/>}
              
               
             
              <Box textAlign="center">
                <Heading as="h4" size="md" noOfLines={2}>
                  {formation.titre}
                </Heading>
                <Text fontSize="sm" noOfLines={3} mt={2}>
                  {formation.description}
                </Text>
              </Box>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Container>
    </Box>
    </>
  );

};

export default Formations;
