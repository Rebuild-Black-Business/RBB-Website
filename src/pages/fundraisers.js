import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Flex,
  Text,
  useTheme,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import { Layout, PageHero } from '../components';
import { FundraiserFeed } from '../components';
import useSearch, { LOADING_STATE } from '../hooks/useSearch';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import { handleLocationToCoords } from '../api/geocode';
import BusinessSignUpForm from '../components/Forms/BusinessSignUpForm';

const ModalForm = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <BusinessSignUpForm isFundraiser={true} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

function generateURL(filters, setPageLocation) {
  let newPath = '/fundraisers';
  let queryString = '';

  if (filters.search) {
    if (queryString === '') {
      queryString += `?search=${filters.search}`;
    } else {
      queryString += `&&search=${filters.search}`;
    }
  }

  if (filters.location) {
    if (queryString === '') {
      queryString += `?location=${filters.location}`;
    } else {
      queryString += `&&location=${filters.location}`;
    }
  }

  setPageLocation(location => ({
    ...location,
    pathname: newPath,
    search: queryString,
  }));

  window.history.replaceState({}, undefined, newPath + queryString);
}

// get search param from url
function searchName(location) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('search');
}

// get location param from url
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

export default function Fundraisers(props) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [pageLocation, setPageLocation] = useState(props.location);
  const [searchFilters, setSearchFilters] = useState({
    coordinates: {},
    search: searchName(props.location),
    location: searchLocation(props.location),
    need: true,
    hasDonationLink: true,
  });

  const theme = useTheme();
  const { page } = usePagination(pageLocation);
  const { results, totalPages, loadingState, setLoadingState } = useSearch(
    searchFilters,
    page,
    14
  );

  // update pageLocation on page-location changes (e.g: when opage number changes)
  useEffect(() => {
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

  // make sure skeleton loaders appear when changing page number
  useLayoutEffect(() => {
    setLoadingState(currLoadingState =>
      currLoadingState === LOADING_STATE.INITIAL ||
      currLoadingState === LOADING_STATE.SEARCHING
        ? currLoadingState
        : LOADING_STATE.SEARCHING
    );
  }, [props.location, setLoadingState]);

  const isSearching = loadingState === LOADING_STATE.SEARCHING;

  function onSearch(filters) {
    setLoadingState(LOADING_STATE.SEARCHING);
    generateURL(filters, setPageLocation);
    setSearchFilters(filters);
  }

  const pageSubtitle = (
    <Text
      fontFamily={theme.fonts.heading}
      lineHeight="1.25"
      pb={theme.spacing.base}
      textAlign="center"
    >
      We continuously collect fundraisers that are for specific Black-owned
      businesses or are put together to aid in rebuilding Black-owned
      businesses. Show your support for our Black communities across the nation
      by opening your wallets and donating!
    </Text>
  );

  const heroBackgroundImageUrl =
    '//res.cloudinary.com/rebuild-black-business/image/upload/c_scale,f_auto,h_0.6,q_auto/v1/assets/ally-background';

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Fundraisers"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />

        <FundraiserFeed
          fundraisers={results}
          loadingState={loadingState}
          onSearch={onSearch}
          selectedFilters={searchFilters}
          onOpen={onOpen}
        />

        {!!results.length && !isSearching && (
          <Pagination
            location={pageLocation}
            currentPage={parseInt(page)}
            totalPages={parseInt(totalPages)}
          />
        )}
        <ModalForm isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Layout>
  );
}
