import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import { Flex } from '@chakra-ui/core';
import { PageHero, BusinessFeed } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';
import Pagination from '../components/Pagination';

import { handleLocationToCoords } from '../api/geocode';

import useAlgoliaSearch from '../hooks/useAlgoliaSearch';
import usePagination from '../hooks/usePagination';

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
    <p>
      These business owners have been impacted during the protests. Your support
      will assist their rebuilding efforts. If you are a business owner in need,
      please <a href="#temp">sign up to be added to our list</a>
    </p>
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
