import React, { useMemo, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Box } from '@chakra-ui/core';
import ResourceFilter from '../Filters/ResourceFilter';
import ResultCard from '../ResultCard';

const ResourceFeed = data => {
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    location: '',
  });
  const [allResources] = useState(data.data.allAirtableResources.nodes);
  const [orgs, setOrgs] = useState(allResources);

  useMemo(() => {
    const filteredResults = allResources
      .filter(org => {
        const input = searchFilters.location.toLowerCase();
        // @TODO :: Zip codes will be leveraged as the data that we collect, however we will take the zip codes from the DB and convert it to "City, ST" format.
        // @TODO :: explore https://www.npmjs.com/package/zipcodes - this thing also includes distance measurements so we could eventually do things like "within 25 miles of me"
        // @TODO :: Remove the toString here, this is a stopgap since we're now getting integers from the DB instead of strings.
        const orgName = org.data['Zip_Code'].toString().toLowerCase();
        return orgName.includes(input);
      })
      .filter(
        resource =>
          resource.data['Category'] === searchFilters.category ||
          searchFilters.category === ''
      );
    setOrgs(filteredResults);
  }, [searchFilters, allResources]);

  const renderResults = () => {
    return orgs.length > 0 ? (
      <Box as="pre" whiteSpace="break-spaces">
        {orgs.map(business => (
          <ResultCard
            name={business.data.Entity_Name}
            category={business.data.Category}
            description={business.data.Description}
            location={business.data.Zip_Code}
            websiteUrl={business.data.Website}
            donationUrl={business.data.donationUrl}
          />
        ))}
      </Box>
    ) : (
      <Box as="pre">No results...</Box>
    );
  };

  return (
    <>
      <ResourceFilter onSearch={filters => setSearchFilters(filters)} />
      {renderResults()}
    </>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableResources {
          nodes {
            data {
              Email
              Name
              Entity_Name
              Category
              Tagged_For
              Description
              Zip_Code
              Website
              CreatedAt
            }
          }
        }
      }
    `}
    render={data => <ResourceFeed data={data} {...props} />}
  />
);
