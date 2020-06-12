import { Box, Flex, Heading } from '@chakra-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import Privacy from '../docs/privacy-policy';
import Terms from '../docs/terms-and-conditions';

export default function About() {
  const legalData = [
    {
      id: 'terms',
      title: 'Terms and Conditions',
      body: <Terms />,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      body: <Privacy />,
    },
  ];
  return (
    <Layout p="4">
      <Flex justify="center" direction="column" align="center">
        <Heading as="h1" textAlign="center">
          Legal
        </Heading>
        <Box maxWidth="800px" w="90%" m="3em">
          {legalData.map(entry => (
            <>
              <Heading
                id={entry.id}
                as="h2"
                textAlign="left"
                fontSize="1.5rem"
                key={entry.title}
              >
                {entry.title}
              </Heading>
              {entry.body}
            </>
          ))}
        </Box>
      </Flex>
    </Layout>
  );
}
