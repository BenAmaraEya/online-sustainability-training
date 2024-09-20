import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const Dashboard = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(response.data)
      } catch (err) {
        setError('Error fetching formations');
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Your Subscribed Formations</Heading>
      {formations.length === 0 ? (
        <Text>You are not subscribed to any formations.</Text>
      ) : (
        <List spacing={3}>
          {formations.map((formation) => (
            <ListItem key={formation.idFormation._id}>
            
              <Text fontWeight="bold">{formation.idFormation.titre}</Text> 
              <Text fontWeight="bold">{formation.idFormation.description}</Text> 
              
              <Text>Date of Subscription: {new Date(formation.date_inscri).toLocaleDateString()}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Dashboard;
