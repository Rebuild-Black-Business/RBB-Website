import React, { useState, useRef } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import {
  Box,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useTheme,
  useDisclosure,
} from '@chakra-ui/core';
import AllyCard from '../Cards/AllyCard';
import { CardWrapper, CardHeading, CardText, CardContent } from '../Card';
import Button from '../Button';
import Image from '../Image';

// @TODO :: Add proper content to this modal. Probably pull this out into its own file seeing as its going to be a form
const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Ally Form here</ModalBody>
      <ModalFooter>
        <Button variantColor="blue" m={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const AllyFeed = data => {
  const [allAllies] = useState(data.data.allAirtableAllies.nodes);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const focusRef = useRef();
  const theme = useTheme();

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
    >
      {allAllies.length > 0 ? (
        <SimpleGrid
          columns={[null, 1, 2, 4]}
          spacing={theme.spacing.med}
          paddingBottom={theme.spacing.lg}
        >
          {allAllies.map((allies, index) => {
            if (index === 4)
              return (
                <>
                  <CardWrapper
                    gridColumn={[null, null, 'span 2']}
                    pr={theme.spacing.lg}
                    pos="relative"
                  >
                    <Image
                      cloudName="rebuild-black-business"
                      publicId="assets/ally-sign-up"
                      transforms={{
                        fetchFormat: 'auto',
                        quality: 'auto',
                      }}
                      objectFit="cover"
                      pos="absolute"
                      zIndex="-1"
                      w="100%"
                      h="100%"
                      top="0"
                      left="0"
                    />
                    <CardContent
                      color={theme.colors['rbb-white']}
                      display="flex"
                      flexDirection="column"
                    >
                      <CardHeading
                        fontFamily={theme.fonts['heading-slab']}
                        textTransform="uppercase"
                        fontSize={theme.fontSizes.xl}
                        lineHeight="1"
                        overflowWrap="break-word"
                        wordWrap="break-word"
                        wordBreak="break-word"
                        hyphens="auto"
                      >
                        Sign up to be an Ally
                      </CardHeading>
                      <CardText
                        as="p"
                        fontFamily={theme.fonts.heading}
                        fontSize={theme.fontSizes.base}
                      >
                        Use your skills to assist Black-owned businesses to
                        return to business and stay afloat while operating. Sign
                        added to a private directory of Allies shared with Black
                        business owners.
                      </CardText>
                      <Button
                        variant="cta"
                        mt={theme.spacing.base}
                        onClick={onOpen}
                        ref={focusRef}
                      >
                        Share Your Skills
                      </Button>
                    </CardContent>
                  </CardWrapper>

                  <AllyCard
                    key={index}
                    name={allies.data.Name}
                    email={allies.data.Email}
                    specialty={allies.data.Speciality}
                    location={allies.data.Zip_Code}
                  />
                </>
              );
            return (
              <AllyCard
                key={index}
                name={allies.data.Name}
                email={allies.data.Email}
                specialty={allies.data.Speciality}
                location={allies.data.Zip_Code}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <Box as="pre">No results...</Box>
      )}
      <ModalForm
        isOpen={isOpen}
        title="Sign up to be an Ally"
        onClose={onClose}
      />
    </Box>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableAllies {
          nodes {
            data {
              Email
              Name
              Speciality
              Zip_Code
              CreatedAt
            }
          }
        }
      }
    `}
    render={data => <AllyFeed data={data} {...props} />}
  />
);
