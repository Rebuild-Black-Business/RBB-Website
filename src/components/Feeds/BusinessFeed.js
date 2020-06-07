import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from '@chakra-ui/core';

import BusinessFilter, { needTypes } from '../Filters/BusinessFilter';

const BusinessesFeed = data => {
  const [businessFilters, setBusinessFilters] = useState({
    type: '',
    location: '',
    need: needTypes[0].id,
  });
  const [allBusinesses] = useState(data.data.allAirtableBusinesses.nodes);
  const [businesses, setBusinesses] = useState(allBusinesses);

  useEffect(() => {
    const filteredBusinesses = allBusinesses
      .filter(biz => {
        // Need filter
        if (businessFilters.need === needTypes[0].id) {
          return biz.data['In_Need'];
        } else {
          return !biz.data['In_Need'];
        }
      })
      .filter(biz => {
        // Category filter
        const selectedBizCategory = businessFilters.type.toLowerCase();
        const currentBizCategory = biz.data['Category'].toLowerCase();
        return currentBizCategory === selectedBizCategory ||
          businessFilters.type === ''
          ? biz
          : null;
      });
    console.log(filteredBusinesses);

    setBusinesses(filteredBusinesses);
  }, [businessFilters, allBusinesses]);

  const renderResults = () => {
    return businesses.length > 0 ? (
      <Box as="pre" whiteSpace="break-spaces">
        {JSON.stringify(businesses, null, 2)}
      </Box>
    ) : (
      <Box as="pre">No results...</Box>
    );
  };

  return (
    <>
      <BusinessFilter onSearch={filters => setBusinessFilters(filters)} />
      {renderResults()}
    </>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableBusinesses {
          nodes {
            data {
              Email
              Name
              Business_Name
              Category
              Zip_Code
              Business_Description
              Website
              Donation_Link
              In_Need
              CreatedAt
            }
          }
        }
      }
    `}
    render={data => <BusinessesFeed data={data} {...props} />}
  />
);
