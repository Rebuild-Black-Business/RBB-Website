import React from 'react';
import { graphql } from 'gatsby';

import { Box, Flex, Grid, Heading, Text, useTheme } from '@chakra-ui/core';

import { Layout, SEO } from '../components';

const SingleBusinessPage = ({ data }) => {
  const theme = useTheme();

  const business = data.airtableBusinesses.data;
  const {
    // name,
    approved,
    businessName,
    businessDescription,
    category,
    // createdAt,
    // donationLink,
    // email,
    // id,
    // inNeed,
    // physicalLocation,
    // website,
    // zipCode,
  } = business;

  if (!approved) return null;

  return (
    <Layout>
      <SEO title={businessName} description={businessDescription} />
      <Flex
        align="center"
        justify="center"
        direction="column"
        margin={`${theme.spacing.base} auto`}
        maxWidth={theme.containers.main}
      >
        <Flex
          direction="column"
          width="100%"
          color={theme.colors['rbb-white']}
          backgroundColor={theme.colors.darkBackground}
          padding={theme.spacing.base}
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
          height="240px"
        >
          <div>
            <Heading as="h1" textTransform="uppercase">
              {businessName}
            </Heading>
            <Text>{category}</Text>
          </div>

          <Flex direction="row">
            <div>
              {/* TODO: render social media links for this profile here */}
            </div>
            <div>{/* TODO: share and flag buttons */}</div>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export const query = graphql`
  query SingleBusinessPageQuery($businessId: String) {
    airtableBusinesses(id: { eq: $businessId }) {
      data {
        name: Name
        approved: Approved
        businessName: Business_Name
        businessDescription: Business_Description
        category: Category
        createdAt: CreatedAt
        donationLink: Donation_Link
        email: Email
        id: ID
        inNeed: In_Need
        physicalLocation: Physical_Location
        website: Website
        zipCode: Zip_Code
      }
    }
  }
`;

export default SingleBusinessPage;
