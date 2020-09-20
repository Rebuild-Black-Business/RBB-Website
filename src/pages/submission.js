import React from 'react';
import { Flex, useTheme, Text } from '@chakra-ui/core';
import Layout from '../components/Layout';
import PageHeading from '../components/Headings/PageHeading';
import { MESSAGE } from '../constants/vettingProcess';
import ExternalLink from '../components/ExternalLink';

const Process = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <Flex
          w="100%"
          minH="260px"
          align="center"
          justify="center"
          zIndex="-1"
          backgroundColor="#000"
          color="#FFF"
          position="relative"
        >
          <PageHeading>Business Vetting Process</PageHeading>
        </Flex>
        <Flex w="100%" backgroundColor={theme.colors['rbb-white']}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            marginTop={[theme.spacing.base, theme.spacing.base, 0, 0]}
            marginBottom={['1.125rem', '1.125rem', 0, 0]}
            marginLeft={[0, 0, '5%', '15%', '15%', '30%']}
            marginRight={[0, 0, '5%', '20%', '22%', '35%']}
          >
            <Text
              style={{ whiteSpace: 'pre-wrap' }}
              textAlign={['center', 'center', 'center', 'left']}
              paddingLeft={[0, 0, '1.5625rem', '1.5625rem']}
              marginLeft={['1.5rem', '24p1.5rem', 0]}
              marginRight={['1.5rem', '1.5rem', 0]}
              marginTop="2.9375rem"
              marginBottom="0"
            >
              {MESSAGE}
            </Text>
            <Text
              style={{ whiteSpace: 'pre-wrap' }}
              textAlign="center"
              paddingLeft="0"
              marginLeft="0"
              marginRight="1.5rem"
              marginTop="1.9375rem"
              marginBottom="2.9375rem"
            >
              If you have questions, please email us at{' '}
              <ExternalLink
                variant="standard"
                href="mailto:social@rebuildblackbusiness.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                social@rebuildblackbusiness.com.
              </ExternalLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Process;
