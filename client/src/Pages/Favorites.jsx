import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Favorites = ({ favorites, rates }) => {
  return (
    <Box maxWidth="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" mb={4} textAlign="center">
        Favorites
      </Heading>
      {favorites.length === 0 ? (
        <Text>No favorites added yet.</Text>
      ) : (
        favorites.map((currency) => (
          <Box key={currency} mb={4} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold" mb={2}>{currency}</Text>
            <Text>USD: {rates[currency]?.usd}</Text>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Favorites;
