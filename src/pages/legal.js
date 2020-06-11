import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import Layout from '../components/Layout';
import Terms from '../docs/terms-and-conditions';
import Privacy from '../docs/privacy-policy';

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
