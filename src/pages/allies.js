import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Flex, Link, Heading } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

const Allies = data => {
  return (
    <Layout>
      <Helmet>
        <title>Allies</title>
      </Helmet>
      <Link as={GatsbyLink} to="/">
        Home
      </Link>
      <Flex align="center" justify="center">
        <Heading>Allies</Heading>
      </Flex>
      <div>{JSON.stringify(data, null, 2)}</div>
    </Layout>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableAllies {
          nodes {
            data {
              CreatedAt
              Email
              Location__Zip_Code_
              Name
              Speciality
            }
          }
        }
      }
    `}
    render={data => <Allies data={data} {...props} />}
  />
);
