import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Flex, Link, Heading } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

const BusinessesInNeed = data => {
  return (
    <Layout>
      <Helmet>
        <title>Businesses In Need</title>
      </Helmet>
      <Link as={GatsbyLink} to="/">
        Home
      </Link>
      <Flex align="center" justify="center">
        <Heading>Businesses In Need</Heading>
      </Flex>
      <div>{JSON.stringify(data, null, 2)}</div>
    </Layout>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableBizInNeed {
          nodes {
            data {
              Category
              CreatedAt
              Donation_Website
              Email
              Impacted_Business_Name
              Name
            }
          }
        }
      }
    `}
    render={data => <BusinessesInNeed data={data} {...props} />}
  />
);
