import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Flex, Link, Heading } from '@chakra-ui/core';
import { Link as GatsbyLink } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

const SupportingOrgs = data => {
  return (
    <Layout>
      <Helmet>
        <title>Supporting Orgs</title>
      </Helmet>
      <Link as={GatsbyLink} to="/">
        Home
      </Link>
      <Flex align="center" justify="center">
        <Heading>Supporting Orgs</Heading>
      </Flex>
      <div>{JSON.stringify(data, null, 2)}</div>
    </Layout>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableSupportOrgs {
          nodes {
            data {
              Category
              CreatedAt
              Email
              Location__Zip_Code_
              Name
              Service_Org_Name
              Website
            }
          }
        }
      }
    `}
    render={data => <SupportingOrgs data={data} {...props} />}
  />
);
