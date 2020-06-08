import React, { useMemo, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import ResultCard from '../ResultCard';
import { Box } from '@chakra-ui/core';

import BusinessFilter from '../Filters/BusinessFilter';
import { getLocationZip } from '../../utils/locationUtils';

const BusinessesFeed = data => {
  const [businessFilters, setBusinessFilters] = useState({
    type: '',
    location: '',
    need: true,
  });

  const [allBusinesses] = useState(data.data.allAirtableBusinesses.nodes);
  const [businesses, setBusinesses] = useState(allBusinesses);

  useMemo(() => {
    const associatedZipCodes = getLocationZip(businessFilters.location);
    const filteredBusinesses = allBusinesses
      .filter(biz => {
        // Need filter
        if (businessFilters.need) {
          return biz.data['In_Need'];
        } else {
          return biz;
        }
      })
      .filter(biz => {
        // Category filter
        if (businessFilters.type === '') return biz;
        return biz.data['Category'].toLowerCase() ===
          businessFilters.type.toLowerCase()
          ? biz
          : null;
      })
      .filter(biz => {
        // Return when no location entered
        if (businessFilters.location === '') return biz;
        return associatedZipCodes.includes(biz.data['Zip_Code']) ? biz : null;
      });

    setBusinesses(filteredBusinesses);
  }, [businessFilters, allBusinesses]);

  return (
    <>
      <BusinessFilter onSearch={filters => setBusinessFilters(filters)} />
      {businesses.length > 0 ? (
        <>
          <Box>
            {businesses.map((business, index) => (
              <ResultCard
                key={index}
                name={business.data.Business_Name}
                category={business.data.Category}
                description={business.data.Business_Description}
                location={business.data.Zip_Code}
                websiteUrl={business.data.Website}
              />
            ))}
          </Box>
        </>
      ) : (
        <Box as="pre">No results...</Box>
      )}
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
