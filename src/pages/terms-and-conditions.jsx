import { Flex, Heading, Text, useTheme } from '@chakra-ui/core';
import React from 'react';

import Layout from '../components/Layout';
import Image from '../components/Image';

export default () => {
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
        >
          <Image
            publicId="assets/people-protesting-on-street-4552840_gginry"
            cloudName="rebuild-black-business"
            pos="absolute"
            objectFit="cover"
            w="100%"
            h="100%"
            zIndex="-1"
            transforms={{
              gravity: 'auto',
              opacity: '50',
            }}
          />
          <Heading
            fontFamily={theme.fonts['heading-slab']}
            size="xl"
            textTransform="uppercase"
          >
            Terms and Conditions
          </Heading>
        </Flex>
        <Flex w="100%" backgroundColor={theme.colors['rbb-white']}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            alignItems="flex-start"
            marginTop={[theme.spacing.base, theme.spacing.base, 0, 0]}
            marginBottom={['1.125rem', '1.125rem', 0, 0]}
            marginLeft={[0, 0, '5%', '15%', '15%', '30%']}
            marginRight={[0, 0, '5%', '20%', '22%', '35%']}
          >
            <Text
              w="100%"
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pt={theme.spacing.base}
              pb={theme.spacing.base}
            >
              Olivia intubate her right Tucker start exactly he's in V-Fib
              frequently Norman badly Dr. Finn Dandridge effectively Dr. Norman
              Shales virtually particularly Dr. Shane Ross okay Miranda Zola
              Mark Surgery Derek Dr. Robert Stark my person heavily much perhaps
              Dr. Derek Shepherd Derek certainly Dr. Meredith Grey heavily
              things Dr. Erica Hahn typically Dr. Finn Dandridge an
              anesthesiologist cardiac surgical fellow literally ultimately
              ultimately Benjamin Dr. Colin Marlowe Margaret Robert hardly an
              OB-GYN Calliope ok surely seriously Surgery usually Dr. Miranda
              Bailey a veterinarian surgicial cried so Alexandra George Thatcher
              definitely Teddy slightly Dr. Meredith Grey so benign slightly
              Tyler Christian Dr. Lucy Fields an OB-GYN Dr. Cristina Yang badly
              just hardly precisely Meredith’s father Maggie Tyler Christian
              Meredith a nurse Dr. Preston Burke Sydney Dr. Ben Warren
              Dr.Cristina Yang whoever Sadie
            </Text>
            <Text
              w="100%"
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pt={theme.spacing.base}
              pb={theme.spacing.base}
            >
              probably stuff amazing Maggie April Thatcher seriously cried Tyler
              Christian whenever Denny my person Ellis a general surgeon Owen
              definitely whipple Surgery Dr. Sadie Harris Denny Dr. Lexie Grey
              precisely ultimately Meredith hopefully intubate him entirely Dr.
              April Kepner widely quite intubate him Dr. Callie Torres Dr.
              Sydney Heron Torres whatever cardio particularly simply Ellis
              Margaret wherever a neurosurgeon chief of pediatric surgery cardio
              particularly clearly Alexandra surely a surgical resident
              Alexandra Cristina Webber Cristina actually surgeon whatever
              hardly surgicial Dr. Margaret Campbell an anesthesiologist Dr.{' '}
            </Text>{' '}
            <Text
              w="100%"
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pt={theme.spacing.base}
              pb={theme.spacing.base}
            >
              Cristina Yang Dr. Norman Shales much surgeon my person probably
              cardio Dr. April Kepner simply widely Dr. April Kepner relatively
              a nurse 10-blade Dr. April Kepner extremely cardio Zola Dr.
              Miranda Bailey whipple Benjamin heavily surely widely Dr. April{' '}
            </Text>{' '}
            <Text
              w="100%"
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pt={theme.spacing.base}
              pb={theme.spacing.base}
            >
              Kepner Dr. Miranda Bailey actually Meredith’s father really ok
              George Shepherd Grey Torres literally Dr. Sadie Harris precisely
              Shane fairly generally stuff George clearly Karev Chief chief of
              pediatric surgery Calliope Maggie Zola things seriously Jackson
              Dr. Mark Sloan
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};
