import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid } from '@chakra-ui/react';
import Dashboard from './DashBoard';
import Favorites from './Favorites';

const Home = () => {
  const [rates, setRates] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchLiveRates();
    loadFavorites();
  }, []);

  const fetchLiveRates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rates');
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

  return (
    <Container maxW="xl" mt={8}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Dashboard rates={rates} favorites={favorites} setFavorites={setFavorites} />
        </Box>
        <Box>
          <Favorites favorites={favorites} rates={rates} />
        </Box>
      </Grid>
    </Container>
  );
};

export default Home;
