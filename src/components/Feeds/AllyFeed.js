import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {
  Box,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useTheme,
  useDisclosure,
} from '@chakra-ui/core';

import AllyCard from '../Cards/AllyCard';
import NoResultsCard from '../Cards/NoResultsCard';
import { CardWrapper, CardHeading, CardText, CardContent } from '../Card';
import Button from '../Button';
import Image from '../Image';
import SubmitAlly from '../Forms/SubmitAlly';
// @TODO :: Add proper content to this modal. Probably pull this out into its own file seeing as its going to be a form
const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SubmitAlly />
      </ModalBody>
    </ModalContent>
  </Modal>
);

const AllyFeed = props => {
  const [allAllies] = useState(props.data.allAirtableAllies.nodes);
  const [allies, setAllies] = useState(allAllies);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const focusRef = useRef();
  const theme = useTheme();
  const { skill: skillFilter, location: locationFilter } = props.filters;
  const [loaded, setLoaded] = useState(false);

  // This fixes an SSR bug with Chakra SimpleGrid
  //   https://github.com/Rebuild-Black-Business/RBB-Website/issues/129
  useEffect(() => {
    setLoaded(true);
  }, []);

  useMemo(() => {
    const filteredAllies = allAllies.filter(ally => {
      if (skillFilter === '' || skillFilter === null) return ally;
      return ally.data['Speciality'] === skillFilter;
    });

    setAllies(filteredAllies);
  }, [locationFilter, skillFilter, allAllies]);

  return (
    <>
      <Box
        maxW={theme.containers.main}
        paddingX={[null, theme.spacing.base, theme.spacing.lg]}
      >
        {loaded && allies.length > 0 ? (
          <SimpleGrid columns={[null, 1, 3, 4]} spacing={theme.spacing.med}>
            {allies.map((allies, index) => {
              const formattedLocation = `${
                allies.data.City ? allies.data.City : ''
              }${allies.data.City && allies.data.State ? ', ' : ''}${
                allies.data.State ? allies.data.State : ''
              }`;
              if (index === 4)
                return (
                  <React.Fragment key={index}>
                    <CardWrapper
                      gridColumn={[null, null, 'span 2']}
                      pr={theme.spacing.lg}
                      pos="relative"
                    >
                      <Image
                        publicId="assets/ally-sign-up"
                        objectFit="cover"
                        pos="absolute"
                        zIndex="-1"
                        w="100%"
                        h="100%"
                        top="0"
                        left="0"
                      />
                      <Image
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
                          Sign up as an ally
                        </CardHeading>
                        <CardText
                          as="p"
                          fontFamily={theme.fonts.heading}
                          fontSize={theme.fontSizes.base}
                        >
                          Offer your skills to Black-owned businesses. You can
                          help rebuild or keep a business afloat. When you sign
                          up as an Ally, we'll add you to our directory. Then,
                          Black business owners will be able to contact you for
                          help.
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
                      first={allies.data.First_Name}
                      last={allies.data.Last_Name}
                      email={allies.data.Email}
                      specialty={allies.data.Speciality}
                      location={formattedLocation}
                    />
                  </React.Fragment>
                );
              return (
                <AllyCard
                  key={index}
                  first={allies.data.First_Name}
                  last={allies.data.Last_Name}
                  email={allies.data.Email}
                  specialty={allies.data.Speciality}
                  location={formattedLocation}
                />
              );
            })}
          </SimpleGrid>
        ) : (
          <NoResultsCard type="allies" />
        )}
        <ModalForm
          isOpen={isOpen}
          title="Sign up to be an Ally"
          onClose={onClose}
        />
      </Box>
    </>
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
              First_Name
              Last_Name
              Speciality
              City
              State
              CreatedAt
            }
          }
        }
      }
    `}
    render={data => <AllyFeed data={data} {...props} />}
  />
);
