import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import {
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
  Link,
  Icon,
} from '@chakra-ui/core';

import {
  AllyFeed,
  AllyFilter,
  PageHero,
  Layout,
  Pagination,
} from '../components';

export default function Allies() {
  const [allyFilters, setAllyFilters] = useState({
    skill: '',
    location: '',
  });

  const [acceptedTAC, setAcceptedTAC] = useLocalStorage('acceptedTAC', false);

  const pageSubtitle = (
    <p>
      These Allies have skills to share in assisting black-owned businesses to
      return to business, and stay afloat while operating. Reach out to those on
      this page if you know of a way to join the fight in helping businesses
      survive and thrive.
    </p>
  );

  const heroBackgroundImageUrl =
    'http://res.cloudinary.com/rebuild-black-business/image/upload/f_auto/v1/assets/ally-background';

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
              size="lg"
              closeOnOverlayClick={false}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalBody fontSize="lg" mt="8">
                  Please read and accept our{' '}
                  <Link
                    href="/terms-and-conditions"
                    color="rbb-orange"
                    isExternal
                  >
                    terms and conditions <Icon name="external-link" mx="2px" />
                  </Link>{' '}
                  to access our Ally list and contacts.
                </ModalBody>

                <ModalFooter>
                  <Button
                    variantColor="orange"
                    rightIcon="check"
                    onClick={() => {
                      setAcceptedTAC(true);
                      onClose();
                    }}
                  >
                    I accept the Terms and Conditions
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Flex>
    </Layout>
  );
}
