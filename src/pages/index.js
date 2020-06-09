import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import Layout from '../components/Layout';
import ContentBlock from '../components/ContentBlock';
import PrimaryButton from '../components/Buttons/PrimaryButton';

export default () => {
  return (
    <Layout>
      <Flex direction="column" align="center" justify="center">
        <Heading as="h1" size="2xl" fontFamily="Arvo">
          Home
        </Heading>
        <Heading>Center Content</Heading>
        <ContentBlock
          layout="full"
          imageSource="url('https://placehold.it/1920x300')"
          backgroundColor="tomato"
        >
          <Box py={16}>
            <Heading>Business Owners, We're here for you.</Heading>
            <Text>Our mission is to connect...</Text>
            <Text>If you need additional assistance,...</Text>
            <PrimaryButton>Click Me</PrimaryButton>
          </Box>
        </ContentBlock>

        <Heading>Right Side Content</Heading>
        <ContentBlock
          layout="right"
          imageSource="url('https://placehold.it/1920x300')"
          backgroundColor="#000"
          backgroundMode="fade"
        >
          <Box py={16} color="white">
            <Heading>Business Owners, We're here for you.</Heading>
            <Text>Our mission is to connect...</Text>
            <Text>If you need additional assistance,...</Text>
            <PrimaryButton>Click Me</PrimaryButton>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="right"
          imageSource="url('https://placehold.it/1920x300')"
          backgroundColor="#ff00ff"
          backgroundMode="tint"
        >
          <Box py={16} color="white">
            <Heading>Business Owners, We're here for you.</Heading>
            <Text>Our mission is to connect...</Text>
            <Text>If you need additional assistance,...</Text>
            <PrimaryButton>Click Me</PrimaryButton>
          </Box>
        </ContentBlock>

        <Heading>Left Side Content</Heading>
        <ContentBlock
          layout="left"
          imageSource="url('https://placehold.it/1920x300')"
          backgroundColor="#000"
          backgroundMode="fade"
        >
          <Box py={16} color="white">
            <Heading>Business Owners, We're here for you.</Heading>
            <Text>Our mission is to connect...</Text>
            <Text>If you need additional assistance,...</Text>
            <PrimaryButton>Click Me</PrimaryButton>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="left"
          imageSource="url('https://placehold.it/1920x300')"
          backgroundColor="#ff00ff"
          backgroundMode="tint"
        >
          <Box py={16} color="white">
            <Heading>Business Owners, We're here for you.</Heading>
            <Text>Our mission is to connect...</Text>
            <Text>If you need additional assistance,...</Text>
            <PrimaryButton>Click Me</PrimaryButton>
          </Box>
        </ContentBlock>
      </Flex>
    </Layout>
  );
};
