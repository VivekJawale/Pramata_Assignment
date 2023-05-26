import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const Dashboard = () => {
    const [rates, setRates] = useState({});
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      fetchLiveRates();
      loadFavorites();
    }, []);
  
    const fetchLiveRates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/liverates');
        const ratesData = response.data;
        setRates(ratesData);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
  
    const addToFavorites = (currency) => {
      const updatedFavorites = [...favorites, currency];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
  
    const removeFromFavorites = (currency) => {
      const updatedFavorites = favorites.filter((fav) => fav !== currency);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
  
    const isFavorite = (currency) => favorites.includes(currency);
  
    return (
      <Box maxWidth="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
        <Heading as="h2" mb={4} textAlign="center">
          Live Rates
        </Heading>
        {Object.keys(rates).map((currency) => (
          <Box key={currency} mb={4} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" mb={2}>{currency}</Text>
            <Text>USD: {rates[currency]?.usd}</Text>
            <Button
              mt={2}
              colorScheme={isFavorite(currency) ? 'teal' : 'gray'}
              onClick={() => {
                if (isFavorite(currency)) {
                  removeFromFavorites(currency);
                } else {
                  addToFavorites(currency);
                }
              }}
            >
              {isFavorite(currency) ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </Box>
        ))}
      </Box>
    );
  };
  
  export default Dashboard;
  
  
