import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Flex, Heading, useTheme } from '@chakra-ui/core';

import { Layout, SEO } from '../components';

const SingleBusinessPage = ({ data }) => {
  const theme = useTheme();

  const business = data.airtableBusinesses.data;
  const {
    // name,
    approved,
    businessName,
    businessDescription,
    // category,
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

  // assemble the string to use in the page title for SEO purposese
  let pageTitle = businessName;
  if (business.physicalLocation) {
    pageTitle += `in ${business.physicalLocation}`;
  }

  return (
    <Layout>
      <SEO title={pageTitle} description={businessDescription} />
      <Flex
        align="center"
        justify="center"
        direction="column"
        marginTop={theme.spacing.base}
      >
        <Heading as="h1">{businessName}</Heading>
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
