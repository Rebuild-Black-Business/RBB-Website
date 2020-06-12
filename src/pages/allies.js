import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { AllyFeed, AllyFilter, Image, Layout, PageHero } from '../components';
import Button from '../components/Button';
import Link from '../components/Link';

export default function Allies(props) {
  const [allyFilters, setAllyFilters] = useState({
    skill: '',
    location: '',
  });
  const theme = useTheme();

  const [acceptedTAC, setAcceptedTAC] = useLocalStorage('acceptedTAC', false);

  const pageSubtitle = (
    <Text
      fontFamily={theme.fonts.heading}
      lineHeight="1.25"
      pb={theme.spacing.base}
      textAlign="center"
    >
      These Allies are offering their skills to help Black-owned businesses.
      Whether you need to rebuild or stay afloat, an Ally can help. Search for
      Allies by skill or location and contact them directly.
    </Text>
  );

  const heroBackgroundImageUrl =
    '//res.cloudinary.com/rebuild-black-business/image/upload/c_scale,f_auto,h_0.6,q_auto/v1/assets/ally-background';

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!acceptedTAC) onOpen();
  }, [acceptedTAC, onOpen]);

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Allies"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />
        <AllyFilter onSearch={setAllyFilters} />
        {acceptedTAC ? (
          <AllyFeed filters={allyFilters} />
        ) : (
          <>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              closeOnEsc={false}
              size="lg"
              closeOnOverlayClick={false}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader padding={0} margin={0}>
                  <Image
                    alt="Person with a bandana over their mouth, holding one arm in the air"
                    publicId="assets/ally-sign-up"
                  />
                </ModalHeader>
                <ModalBody fontSize="lg" mt="8">
                  Please read and agree to our{' '}
                  <Link variant="cta" href="/legal#terms" target="_blank">
                    terms and conditions
                  </Link>{' '}
                  to access our Ally list and contacts.
                </ModalBody>
                <ModalFooter>
                  <Button
                    margin="0 auto"
                    variant="primary"
                    rightIcon="check"
                    onClick={() => {
                      setAcceptedTAC(true);
                      onClose();
                    }}
                  >
                    I agree
                  </Button>
                </ModalFooter>

                <Box textAlign="center" marginBottom="0.625rem">
                  or, {''}
                  <Link variant="cta" href="/">
                    back to the homepage
                  </Link>
                </Box>
              </ModalContent>
            </Modal>
          </>
        )}
      </Flex>
    </Layout>
  );
}
