import React, { useState, useEffect, useLayoutEffect } from 'react';

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import { PageHero, BusinessFeed } from '../components';
import Pagination from '../components/Pagination';

import { handleLocationToCoords } from '../api/geocode';

import useSearch, { LOADING_STATE } from '../hooks/useSearch';
import usePagination from '../hooks/usePagination';
import Button from '../components/Button';
import BusinessSignUpForm from '../components/Forms/BusinessSignUpForm';

const ModalForm = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <BusinessSignUpForm />
      </ModalBody>
    </ModalContent>
  </Modal>
);

function generateURL(filters, setPageLocation) {
  let newPath = '/businesses';
  let queryString = '';

  if (filters.need === 'false') {
    newPath += '/all';
  }

  if (filters.type) {
    newPath += `/${filters.type.replace(/ /g, '-')}`;
  }

  if (filters.location) {
    queryString += `?location=${filters.location}`;
  }

  // Update the page location state so pagination works
  // This imitates what navigation should do without a refresh.
  setPageLocation(location => ({
    ...location,
    pathname: newPath,
    search: queryString,
  }));
  // Decided not to use nagivate here as it was causing a DOM refresh.
  window.history.replaceState({}, undefined, newPath + queryString);
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
  const [pageLocation, setPageLocation] = useState(props.location);
  const [searchFilters, setSearchFilters] = useState({
    location: searchLocation(props.location),
    need: searchingInNeed(props.location),
    type: searchCategory(props.category),
    coordinates: {},
  });
  const theme = useTheme();
  const { page } = usePagination(pageLocation);
  const { results, totalPages, loadingState, setLoadingState } = useSearch(
    searchFilters,
    page
  );

  // Do this before we start searching and paginating
  useEffect(() => {
    // Make sure it gets updated on page navigation
    setPageLocation(props.location);

    // Does not use pageLocation as it should only run on first load.
    async function setLocationCoordinatesFromURL() {
      const coordinates = await searchCoordinates(props.location);
      setSearchFilters(current => ({
        ...current,
        coordinates,
      }));
    }
    setLocationCoordinatesFromURL();
  }, [props.location]);

  // useLayoutEffect will make sure the skeleton loaders appear immediately when the page location changes
  // using useEffect will also work but it will show a flash of ResultCards before showing the skeleton loaders
  useLayoutEffect(() => {
    setLoadingState(currLoadingState =>
      currLoadingState === LOADING_STATE.INITIAL
        ? currLoadingState
        : LOADING_STATE.SEARCHING
    );
  }, [props.location, setLoadingState]);

  const searching = loadingState === LOADING_STATE.SEARCHING;

  function onSearch(filters) {
    setLoadingState(LOADING_STATE.SEARCHING);
    generateURL(filters, setPageLocation);
    setSearchFilters(filters);
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

        <BusinessFeed
          businesses={results}
          onSearch={onSearch}
          selectedFilters={searchFilters}
          loadingState={loadingState}
          onOpen={onOpen}
        />

        {!!results.length && !searching && (
          <Pagination
            location={pageLocation}
            currentPage={parseInt(page)}
            totalPages={parseInt(totalPages)}
          />
        )}
      </Flex>
    </>
  );
}
