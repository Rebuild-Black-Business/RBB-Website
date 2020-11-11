import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';

import React, { useState } from 'react';

import { Button, ContentBlock, Layout } from '../components';

import { VOLUNTEER_URL } from '../constants/about';
import AllySignUpForm from '../components/Forms/AllySignUpForm';
import BusinessSignUpForm from '../components/Forms/BusinessSignUpForm';

const InfoModal = ({ isOpen, onClose, modalType }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        {modalType === 'ally' && <AllySignUpForm />}
        {modalType === 'business' && <BusinessSignUpForm />}
      </ModalBody>
    </ModalContent>
  </Modal>
);

const Index = () => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(null);

  // TODO: Re-enable this lint rule once handleType() is used!
  // eslint-disable-next-line no-unused-vars
  const handleType = newType => {
    setModalType(newType);
    onOpen();
  };

  const ctaButtonStyle = {
    backgroundColor: theme.colors['rbb-orange'],
    borderColor: '#C34D2B',
    textDecoration: 'none',
  };

  const secondaryButtonStyle = {
    backgroundColor: theme.colors['rbb-white'],
    color: theme.colors['rbb-black-200'],
    textDecoration: 'none',
  };

  return (
    <Layout>
      <Flex direction="column" align="center" justify="center">
        <ContentBlock
          layout="left"
          imageSource="assets/home-header-bg" // @TODO :: Pass this to cloudinary
          backgroundColor="#000"
          backgroundMode="fade"
        >
          <Box pt={16} pb={[72, 72, 145]} ml={[0, 0, 10]} color="white">
            <Heading mb={theme.spacing.lg} as="h1">
              <Text
                lineHeight="0.5"
                fontWeight="900"
                fontSize={['50px', '50px', '50px', '72px']}
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Rebuild
              </Text>
              <Text
                fontSize={['100px', '100px', '100px', '150px']}
                fontWeight="900"
                lineHeight="1"
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
                ml={[0, 0, -1]}
              >
                Black
              </Text>
              <Text
                lineHeight="0.5"
                fontWeight="900"
                fontSize={['50px', '50px', '50px', '72px']}
                fontFamily={theme.fonts['heading-slab']}
                textTransform="uppercase"
              >
                Businesses
              </Text>
            </Heading>
            <Text
              fontSize={theme.fontSizes.lg}
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              py={8}
              maxW="540px"
            >
              Black-owned businesses need us. In a time of social unrest and
              economic uncertainty, we are called to action!{' '}
              <strong>Let’s do our part</strong>.
            </Text>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button
                as={Link}
                href={'/businesses'}
                style={ctaButtonStyle}
                variant="cta"
                m={3}
                h="auto"
                px="30px"
              >
                See Businesses
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="right"
          imageSource="assets/cta1-bg" // @TODO :: Pass this to cloudinary
          backgroundColor="#fff"
          backgroundMode="fade"
          backgroundOpacity="0.85"
        >
          <Box py={[72, 72, 190]} color={theme.colors['rbb-black-100']}>
            <Heading
              mb={theme.spacing.lg}
              fontFamily={theme.fonts['heading-slab']}
              fontWeight="900"
              fontSize="40px"
              lineHeight="1.2"
              textTransform="uppercase"
            >
              Business Owners,
              <br />
              We&rsquo;re here for you.
            </Heading>
            <Box fontSize={theme.fontSizes.lg} maxW="540px">
              <Text
                fontFamily={theme.fonts.heading}
                lineHeight="1.25"
                pb={theme.spacing.base}
              >
                We want to restore wealth to Black communities by supporting you
                and your business. Whether your business is in urgent need or
                you are doing well, we're here to help.
              </Text>
              <Text fontFamily={theme.fonts.heading} lineHeight="1.25">
                Contact one of our registered Allies directly for help.{' '}
                <strong>We are all in this together.</strong>
              </Text>
            </Box>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button
                variant="primary"
                m={3}
                h="auto"
                px="30px"
                as={Link}
                href="/allies"
              >
                See Allies
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="left"
          imageSource="assets/cta2-bg" // @TODO :: Pass this to cloudinary
          backgroundColor="#000"
          backgroundMode="fade"
        >
          <Box py={[72, 72, 190]} color={theme.colors['rbb-white']}>
            <Heading
              mb={theme.spacing.lg}
              fontFamily={theme.fonts['heading-slab']}
              fontWeight="900"
              fontSize="40px"
              lineHeight="1.2"
              textTransform="uppercase"
            >
              How to help
            </Heading>
            <Box fontSize={theme.fontSizes.lg} maxW="540px">
              <Text
                fontFamily={theme.fonts.heading}
                lineHeight="1.25"
                pb={theme.spacing.base}
              >
                View our growing list of Black-owned businesses across the
                nation! Find Black-owned businesses in your area or register any
                that we’re missing.
              </Text>
              <Text fontFamily={theme.fonts.heading} lineHeight="1.25">
                If you have specific skills you&rsquo;d like to offer, you can
                register as an Ally.
              </Text>
            </Box>
            <ButtonGroup spacing={4} mt={theme.spacing.base}>
              <Button
                variant="primary"
                maxW="230px"
                m={3}
                h="auto"
                px="30px"
                as={Link}
                href="/businesses"
              >
                See Businesses
              </Button>
              <Button
                as={Link}
                href="/allies"
                variant="secondary"
                maxW="230px"
                m={3}
                h="auto"
                style={secondaryButtonStyle}
                px="30px"
              >
                Sign up as an Ally
              </Button>
            </ButtonGroup>
          </Box>
        </ContentBlock>

        <ContentBlock
          layout="full"
          imageSource="assets/cta3-bg"
          backgroundColor={theme.colors['rbb-white']}
        >
          <Box py={[140, 140, 200]} maxW="574px">
            <Heading
              mb={theme.spacing.lg}
              fontFamily={theme.fonts['heading-slab']}
              fontWeight="900"
              fontSize="40px"
              lineHeight="1.2"
              textTransform="uppercase"
            >
              Volunteer with us!
            </Heading>
            <Text
              fontFamily={theme.fonts.heading}
              lineHeight="1.25"
              pb={theme.spacing.base}
            >
              Join our group of volunteers. We’re developers, designers,
              marketers, project managers, policy makers, and web professionals.
              Welcome!
            </Text>
            <Button
              variant="cta"
              style={ctaButtonStyle}
              as={Link}
              href={VOLUNTEER_URL}
              mt={theme.spacing.base}
            >
              Join Us
            </Button>
          </Box>
        </ContentBlock>
      </Flex>
      <InfoModal isOpen={isOpen} modalType={modalType} onClose={onClose} />
    </Layout>
  );
};
export default Index;
