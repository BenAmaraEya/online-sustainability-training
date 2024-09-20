import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Container, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('id'); // Get the user ID from localStorage

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
        setUser(response.data); // Assuming the API returns user details
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, []);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl">
          User not found
        </Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" mt={10}>
      <Box borderWidth="1px" borderRadius="lg" p={5} shadow="md">
        <Heading as="h2" size="lg" mb={5}>
          Profile Information
        </Heading>
        <Text fontSize="lg">
          <strong>Nom:</strong> {user.nom}
        </Text>
        <Text fontSize="lg">
          <strong>Prénom:</strong> {user.prenom}
        </Text>
        <Text fontSize="lg">
          <strong>Email:</strong> {user.email}
        </Text>
        <Text fontSize="lg">
          <strong>cin:</strong> {user.cin}
        </Text>
        <Text fontSize="lg">
          <strong>secteur:</strong> {user.secteur}
        </Text>
       
      </Box>
    </Container>
  );
};

export default Profile;
