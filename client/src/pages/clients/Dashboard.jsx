import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Spinner,
  Alert,
  AlertIcon,
  Link,
  Divider
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('id'); // Retrieve user ID from local storage

    const fetchFormations = async () => {
      if (!userId) {
        setError('User not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/inscription/user/${userId}/formations`);
        setFormations(response.data);
      } catch (err) {
        setError('Error fetching formations');
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/formationdetails/${id}`);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  const filteredFormations = formations.filter((formation) =>
    formation.idFormation.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container maxW="container.xl" p={4} bg="white" color="black" borderRadius="lg">
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

        <Flex align="center" mt={8} mb={4}>
  <Heading as="h4" size="md" textAlign="center" mr={4}>
    vos formations
  </Heading>
  <Divider borderColor="gray.400" />
</Flex>
        {filteredFormations.length === 0 ? (
          <Text textAlign="center">You are not subscribed to any formations.</Text>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {filteredFormations.map((formation) => (
              <Box
                key={formation.idFormation._id}
                p={4}
                border="1px solid #e2e8f0"
                borderRadius="lg"
                _hover={{ boxShadow: "md", transition: "0.3s", cursor: "pointer" }}
                onClick={() => handleCardClick(formation.idFormation._id)}
              >
                <VStack spacing={4} align="stretch">
                  {formation.idFormation.image && (
                    <Image
                      src={`http://localhost:5000/${formation.idFormation.image}`}
                      alt={formation.idFormation.titre}
                      borderRadius="md"
                      boxSize="200px"
                      objectFit="cover"
                    />
                  )}
                  <Heading as="h4" size="md" noOfLines={2} textAlign="center">
                    {formation.idFormation.titre}
                  </Heading>
                  <Text fontSize="sm" noOfLines={3} mt={2}>
                    {formation.idFormation.description}
                  </Text>
                  <Text fontSize="sm" noOfLines={3} mt={2}>
                    Subscribed on: {new Date(formation.date_inscri).toLocaleDateString()}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
