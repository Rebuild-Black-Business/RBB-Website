import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import { PageHero, BusinessFeed } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';
import Pagination from '../components/Pagination';

import { handleLocationToCoords } from '../api/geocode';

import useAlgoliaSearch from '../hooks/useAlgoliaSearch';
import usePagination from '../hooks/usePagination';
import SubmitBusiness from '../components/Forms/SubmitBusiness';
import Button from '../components/Button';

const ModalForm = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <SubmitBusiness />
      </ModalBody>
    </ModalContent>
  </Modal>
);

function generateURL(filters, location) {
  let newPath = '/businesses';

  if (filters.need === 'false') {
    newPath += '/all';
  }

  if (filters.type) {
    newPath += `/${filters.type.replace(/ /g, '-')}`;
  }

  if (filters.location) {
    newPath += `?location=${filters.location}`;
  }

  navigate(newPath);
}

function searchingInNeed(location) {
  return location.pathname.match(/\/all/) ? 'false' : true;
}

function searchCategory(category) {
  return category ? category.replace(/-/g, ' ') : '';
}

function searchLocation(location) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('location');
}

async function searchCoordinates(location) {
  const searchParams = new URLSearchParams(location.search);
  const coordinates = await handleLocationToCoords(
    searchParams.get('location') || ''
  );
  return coordinates;
}

export default function Businesses(props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [searchFilters, setSearchFilters] = useState({
    location: searchLocation(props.location),
    need: searchingInNeed(props.location),
    type: searchCategory(props.category),
    coordinates: {},
  });

  const { results, totalPages, setSearchPage } = useAlgoliaSearch(
    searchFilters
  );
  const page = usePagination(props.location, page => setSearchPage(page));
  const theme = useTheme();

  useEffect(() => {
    async function setLocationCoordinatesFromURL() {
      const coordinates = await searchCoordinates(props.location);
      setSearchFilters(current => ({
        ...current,
        coordinates,
      }));
    }
    setLocationCoordinatesFromURL();
  }, [props.location]);

  function onSearch(filters) {
    setSearchFilters(filters);
    generateURL(filters, props.location);
  }

  const pageSubtitle = (
    <>
      <Text
        fontFamily={theme.fonts.heading}
        lineHeight="1.25"
        pb={theme.spacing.base}
        textAlign="center"
      >
        Want to find Black-owned businesses across the nation? Filter businesses
        by type, location, and need. Businesses in need have been harmed by the
        ongoing social upheaval. Your support will help them rebuild.
      </Text>
      <Text
        fontFamily={theme.fonts.heading}
        lineHeight="1.25"
        pb={theme.spacing.base}
        textAlign="center"
      >
        You can add a Black-owned business to this list by clicking the button
        below.
      </Text>

      <Button
        variant="primary"
        display="block"
        mx="auto"
        my={3}
        h="auto"
        px="30px"
        onClose={onClose}
        onClick={onOpen}
      >
        Register a Business
      </Button>
      <ModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );

  const heroBackgroundImageUrl =
    '//res.cloudinary.com/rebuild-black-business/image/upload/c_scale,f_auto,h_0.6,q_auto/v1/assets/business-header';

  return (
    <>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Businesses"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />

        <CardSkeleton data={results}>
          <BusinessFeed
            businesses={results}
            onSearch={onSearch}
            selectedFilters={searchFilters}
          />
        </CardSkeleton>

        <Pagination
          location={props.location}
          currentPage={parseInt(page)}
          totalPages={parseInt(totalPages) - 1}
        />
      </Flex>
    </>
  );
}
