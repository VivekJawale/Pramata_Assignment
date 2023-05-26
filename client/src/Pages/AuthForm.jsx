import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8080/api/login', {
          username,
          password,
        });
        console.log('Login successful');
        console.log('Token:', response.data.data.token);
        localStorage.setItem('token', response.data.data.token);
        toast({
          title: 'Login Successful',
          description: 'Please proceed to the dashboard.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:8080/api/register', {
          username,
          password,
        });
        console.log('Registration successful');
        toast({
          title: 'Registration Successful',
          description: 'Please login.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setIsLogin(true); // Switch back to login after successful registration
      }

      // Reset form fields and error state
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      // Handle login or registration error
      console.error('Error:', error.response.data.error);
      setError(error.response.data.error);
      toast({
        title: 'Error',
        description: error.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h2" mb={4} textAlign="center">
        {isLogin ? 'Login' : 'Register'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input type="text" id="username" value={username} onChange={handleUsernameChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </FormControl>
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Button type="submit" colorScheme="teal" isFullWidth>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Stack>
      </form>
      <Button onClick={handleToggle} mt={4} variant="link" colorScheme="teal" alignSelf="center">
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </Button>
    </Box>
  );
};

export default AuthForm;
