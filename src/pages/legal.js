import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import Layout from '../components/Layout';
import Terms from '../constants/terms-and-conditions';

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
      body: `Pudding sweet roll candy canes cheesecake lollipop soufflé. Candy sesame snaps pastry halvah liquorice macaroon. Gummi bears cake sweet caramels bonbon. Jelly liquorice toffee ice cream sweet oat cake biscuit cotton candy cheesecake. Gingerbread tiramisu tootsie roll topping sweet pudding carrot cake chupa chups. Gummi bears halvah gingerbread oat cake pudding chocolate bar. Muffin bear claw chocolate bar. Sugar plum powder cheesecake toffee dessert biscuit cake chupa chups halvah. Candy canes jelly-o toffee candy danish pudding. Lemon drops cake fruitcake. Pastry marshmallow tiramisu. Pastry topping tart dragée gummi bears cotton candy. Sweet roll cheesecake donut marshmallow. Sugar plum jelly-o chocolate cake.`,
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
