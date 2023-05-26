import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text } from '@chakra-ui/react';

const Dashboard = () => {
    const [rates, setRates] = useState({});
  
    useEffect(() => {
      fetchLiveRates();
    }, []);
  
    const fetchLiveRates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/liverates');
        const ratesData = response.data;
        console.log('Rates:', ratesData);
        setRates(ratesData);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    return (
      <Box maxWidth="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
        <Heading as="h2" mb={4} textAlign="center">
          Live Rates
        </Heading>
        {Object.keys(rates).map((currency) => (
          <Box key={currency} mb={4} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" mb={2}>{currency}</Text>
            <Text>USD: {rates[currency]?.usd}</Text>
          </Box>
        ))}
      </Box>
    );
  };
  
  export default Dashboard;
  
