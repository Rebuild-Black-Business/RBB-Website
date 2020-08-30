import React from 'react';
import { graphql } from 'gatsby';

import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  Text,
  useTheme,
  Stack,
} from '@chakra-ui/core';

import { Image, LabeledSection, Layout, SEO } from '../components';
import { Button } from '../components/Button';

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
    donationLink,
    // email,
    // id,
    inNeed,
    // physicalLocation,
    website,
    // zipCode,
  } = business;

  const { hasImage, publicId, src, alt } = useImageForBusiness({
    category,
    imageAlt,
    imageSrc,
  });

  if (!approved) return null;

  return (
    <Layout background={theme.colors['rbb-white']}>
      <SEO title={businessName} description={businessDescription} />
      <Stack
        padding={`${theme.spacing.med} ${theme.spacing.base}`}
        margin={`0 auto`}
        maxWidth={theme.containers.main}
        spacing={theme.spacing.med}
      >
        <Flex
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
        >
          {hasImage && (
            <div height="100%">
              <Image
                publicId={publicId}
                src={src}
                alt={alt}
                transforms={{ width: 464, height: 249, crop: 'fit', dpr: 2 }}
                maxHeight="100%"
              />
            </div>
          )}
          <Flex
            direction="column"
            width="100%"
            color={theme.colors['rbb-white']}
            backgroundColor={theme.colors.darkBackground}
            padding={theme.spacing.base}
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
        {inNeed && donationLink && (
          <Flex
            borderColor={theme.colors.yellow[400]}
            borderWidth="1px"
            borderRadius={theme.spacing.xs}
            flexDirection="row"
            padding={theme.spacing.xs}
            backgroundColor={theme.colors.yellow[100]}
            justifyContent="space-between"
          >
            <Text>
              This business needs our help. If you have the means, please
              support them by donating and/or giving them business.
            </Text>
            <Link to={donationLink} _hover={{ textDecoration: 'none' }}>
              <Button
                fontSize={theme.fontSizes.helper}
                variant="info"
                style={{
                  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                }}
              >
                Donate
              </Button>
            </Link>
          </Flex>
        )}

        <Grid isInline gridTemplateColumns="3fr 1fr">
          <div>
            {website && (
              <LabeledSection label={'Where to Find us'}>
                <Stack>
                  <Stack
                    isInline
                    spacing={theme.spacing.md}
                    alignItems="center"
                    alignContent="flex-start"
                  >
                    <Icon name="at-sign" color="gray.600" />
                    <Stack spacing={0}>
                      <Text>12345 S Main St</Text>
                      <Text>Portland, OR 97219</Text>
                    </Stack>
                  </Stack>

                  <Stack
                    isInline
                    spacing={theme.spacing.md}
                    alignItems="center"
                  >
                    <Icon name="link" color="gray.600" />
                    <Link to={website} fontSize={theme.fontSizes.helper}>
                      {website}
                    </Link>
                  </Stack>

                  <Stack
                    isInline
                    spacing={theme.spacing.md}
                    alignItems="center"
                  >
                    <Icon name="phone" color="gray.600" />
                    <Text>(280) 555-1212</Text>
                  </Stack>
                </Stack>
              </LabeledSection>
            )}

            {businessDescription && (
              <LabeledSection label={'What we do'}>
                <Text>{businessDescription}</Text>
              </LabeledSection>
            )}

            <LabeledSection label={'Who we are'}>
              <Text>
                Uncertain what's supposed to go here but here's some sample text
                for y'all
              </Text>
            </LabeledSection>
          </div>
          <Box
            padding={theme.spacing.base}
            border={`2px solid ${theme.colors['rbb-black-000']}`}
            borderRadius={'8px'}
          >
            <Heading
              as="h3"
              textAlign="center"
              textTransform="uppercase"
              fontFamily={theme.fonts['heading-slab']}
              fontSize={theme.fontSizes.lg}
              fontWeight="900"
            >
              Details
            </Heading>

            <Heading
              as="h4"
              textTransform="uppercase"
              fontFamily={theme.fonts['heading-slab']}
              fontSize={theme.fontSizes.base}
              fontWeight="900"
            >
              Area of Service
            </Heading>
            <Text paddingLeft={theme.spacing.xs}>Lorem ipsum</Text>

            <Heading
              as="h4"
              textTransform="uppercase"
              fontFamily={theme.fonts['heading-slab']}
              fontSize={theme.fontSizes.base}
              fontWeight="900"
              marginTop={theme.spacing.xs}
            >
              Payment Types
            </Heading>
            <Text paddingLeft={theme.spacing.xs}>Lorem, Ipsum, Dolor sit</Text>
          </Box>
        </Grid>
      </Stack>
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
