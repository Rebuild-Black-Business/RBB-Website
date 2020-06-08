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
            // @TODO :: Need to add ither cloundiary image, or background image to this card, as per the designs.
            if (index === 4)
              return (
                <CardWrapper
                  gridColumn={[null, null, 'span 2']}
                  pr={theme.spacing.lg}
                  bg={theme.colors['rbb-black-100']}
                >
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
                      Use your skills to assist Black-owned businesses to return
                      to business and stay afloat while operating. Sign up to be
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
