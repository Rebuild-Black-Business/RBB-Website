import React from 'react';
import { graphql } from 'gatsby';

import { Flex, Heading, Text, useTheme } from '@chakra-ui/core';

import { Image, Layout, SEO } from '../components';

import { useImageForBusiness } from '../utils/business';

const SingleBusinessPage = ({ data }) => {
  const theme = useTheme();

  const business = data.airtableBusinesses.data;
  const {
    // name,
    approved,
    businessName,
    businessDescription,
    category,
    imageAlt, // TODO: these need to be populated in airtable?
    imageSrc, // TODO: these need to be populated in airtable?
    // createdAt,
    // donationLink,
    // email,
    // id,
    // inNeed,
    // physicalLocation,
    // website,
    // zipCode,
  } = business;

  const { hasImage, publicId, src, alt } = useImageForBusiness({
    category,
    imageAlt,
    imageSrc,
  });

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
        <Flex>
          {hasImage && (
            <div maxHeight="240px">
              <Image
                publicId={publicId}
                src={src}
                alt={alt}
                transforms={{ width: 464, height: 240, crop: 'fit', dpr: 2 }}
              />
            </div>
          )}
          <Flex
            direction="column"
            width="100%"
            color={theme.colors['rbb-white']}
            backgroundColor={theme.colors.darkBackground}
            padding={theme.spacing.base}
            style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
            height="270px"
          >
            <div>
              <Heading
                as="h1"
                textTransform="uppercase"
                fontFamily={theme.fonts['heading-slab']}
              >
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
      </Flex>
    </Layout>
  );
};

export const query = graphql`
  query SingleBusinessPageQuery($businessId: String) {
    airtableBusinesses(recordId: { eq: $businessId }) {
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
