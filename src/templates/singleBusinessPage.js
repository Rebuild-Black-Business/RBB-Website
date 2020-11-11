import React from 'react';
import copy from 'copy-to-clipboard';
import { useToast } from '@chakra-ui/core';

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

import {
  ExternalLink,
  Image,
  LabeledSection,
  Layout,
  SEO,
} from '../components';
import { Button } from '../components/Button';
import { useImageForBusiness } from '../utils/business';
import { useBusinessDetails } from '../hooks/useBusinessDetails';

const SingleBusinessPage = ({ location, params }) => {
  const theme = useTheme();

  let businessId = '';

  if (typeof window !== `undefined`) {
    const { id: businessSlug } = params;
    const splitSlug = businessSlug && businessSlug.split('-');
    businessId = splitSlug.length > 0 && splitSlug[splitSlug.length - 1];
  }

  const { data: apiResponse, isError } = useBusinessDetails(businessId);

  const {
    // name,
    approved,
    businessName,
    description: businessDescription,
    category,
    imageAlt, // TODO: these need to be populated in airtable?
    imageSrc, // TODO: these need to be populated in airtable?
    // createdAt,
    donationLink,
    // email,
    // id,
    inNeed,
    // physicalLocation,
    site: website,
    // zipCode,
    city,
    isAdult,
    isPhysicalLocation,
    phone,
    serviceArea,
    state,
    story,
    streetAddress,
    takesBitcoin,
    takesCash,
    takesCheck,
    takesCredit,
    zip,
  } = apiResponse || {};

  const { hasImage, publicId, src, alt } = useImageForBusiness({
    category,
    imageAlt,
    imageSrc,
  });

  const toast = useToast();

  const shareClicked = event => {
    if (event && typeof event.preventDefault === 'function')
      event.preventDefault();

    if (location && location.href) {
      copy(location.href);
      toast({
        title: 'URL Copied to clipboard',
        description: 'Thanks for sharing!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const paymentTypes = [];
  if (takesCash) paymentTypes.push('cash');
  if (takesCheck) paymentTypes.push('check');
  if (takesCredit) paymentTypes.push('credit');
  if (takesBitcoin) paymentTypes.push('bitcoin');

  // // this page returns nothing if this is not an approved business
  if (approved === false && !isError)
    return (
      <Layout>
        <Flex
          alignItems="center"
          justifyContent="center"
          marginTop={['4rem', '4rem', 0, 0]}
          marginBottom={['4rem', '4rem', 0, 0]}
          textAlign={['center', 'center ', 'left ', 'left ']}
          direction={['column', 'column', 'column', 'row']}
        >
          <Flex direction="column" maxW="335px">
            <Text
              as="h1"
              fontFamily={theme.fonts['heading-slab']}
              color={theme.colors['rbb-gray']}
              mt={theme.spacing['med']}
              fontWeight="900"
              fontSize="64px"
              lineHeight="77px"
              textTransform="uppercase"
              marginBottom="0.625rem"
              textAlign="center"
            >
              THIS BUSINESS HAS NOT BEEN APPROVED YET !
            </Text>
          </Flex>
        </Flex>
      </Layout>
    );

  if (isError) {
    return (
      <Layout>
        <Flex
          alignItems="center"
          justifyContent="center"
          marginTop={['4rem', '4rem', 0, 0]}
          marginBottom={['4rem', '4rem', 0, 0]}
          textAlign={['center', 'center ', 'left ', 'left ']}
          direction={['column', 'column', 'column', 'row']}
        >
          <Flex direction="column" maxW="335px">
            <Text
              as="h1"
              fontFamily={theme.fonts['heading-slab']}
              color={theme.colors['rbb-gray']}
              mt={theme.spacing['med']}
              fontWeight="900"
              fontSize="64px"
              lineHeight="77px"
              textTransform="uppercase"
              marginBottom="0.625rem"
              textAlign="center"
            >
              BUSINESS NOT FOUND !
            </Text>
          </Flex>
        </Flex>
      </Layout>
    );
  }
  return (
    <Layout>
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
              <Text>
                {category && category.name}
                {isAdult && <Text as="span"> &bull; Adult (18+)</Text>}
              </Text>
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
            alignItems="center"
          >
            <Text>
              This business needs our help. If you have the means, please
              support them by donating and/or giving them business.
            </Text>
            <ExternalLink
              variant="standard"
              href={donationLink}
              textDecoration="none"
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                fontSize={theme.fontSizes.helper}
                variant="info"
                style={{
                  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                }}
              >
                Donate
              </Button>
            </ExternalLink>
          </Flex>
        )}

        <Grid isInline gridTemplateColumns="3fr 1fr">
          <div>
            <LabeledSection label={'Where to Find us'}>
              <Stack>
                {isPhysicalLocation && (
                  <Stack
                    isInline
                    spacing={theme.spacing.md}
                    alignItems="center"
                    alignContent="flex-start"
                  >
                    <Icon name="at-sign" color="gray.600" />
                    <Stack spacing={0}>
                      <Text>{streetAddress}</Text>
                      <Text as="address">
                        {city} {city && state ? ', ' : ''} {state} {zip}
                      </Text>
                    </Stack>
                  </Stack>
                )}

                {website && (
                  <Stack
                    isInline
                    spacing={theme.spacing.md}
                    alignItems="center"
                  >
                    <Icon name="link" color="gray.600" />
                    <ExternalLink
                      variant="standard"
                      isExternal
                      href={website}
                      fontSize={theme.fontSizes.helper}
                      textDecoration="underline"
                    >
                      {website}
                    </ExternalLink>
                  </Stack>
                )}

                {phone && (
                  <Stack
                    isInline
                    spacing={theme.spacing.md}
                    alignItems="center"
                  >
                    <Icon name="phone" color="gray.600" />
                    <Link href={`tel:${phone}`}>{phone}</Link>
                  </Stack>
                )}
              </Stack>
            </LabeledSection>

            {businessDescription && (
              <LabeledSection label={'What we do'}>
                <Text>{businessDescription}</Text>
              </LabeledSection>
            )}

            {story && (
              <LabeledSection label={'Who we are'}>
                <Text>{story}</Text>
              </LabeledSection>
            )}
          </div>
          <Box
            padding={theme.spacing.base}
            border={`2px solid ${theme.colors['rbb-black-000']}`}
            borderRadius={'8px'}
            height="fit-content"
            hidden={!serviceArea && paymentTypes.length === 0}
          >
            <Heading
              as="h3"
              textAlign="center"
              textTransform="uppercase"
              fontFamily={theme.fonts['heading-slab']}
              fontSize={theme.fontSizes.lg}
              fontWeight="900"
              marginBottom={theme.spacing.xs}
            >
              Details
            </Heading>

            {serviceArea && (
              <>
                <Heading
                  as="h4"
                  textTransform="uppercase"
                  fontFamily={theme.fonts['heading-slab']}
                  fontSize={theme.fontSizes.base}
                  fontWeight="900"
                >
                  Area of Service
                </Heading>
                <Text paddingLeft={theme.spacing.xs}>{serviceArea}</Text>
              </>
            )}

            {paymentTypes.length && (
              <>
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
                <Text paddingLeft={theme.spacing.xs} textTransform="capitalize">
                  {paymentTypes.map(
                    (type, idx) =>
                      `${type} ${paymentTypes.length > idx + 1 ? ' ,' : ''}`
                  )}
                </Text>
              </>
            )}
          </Box>
        </Grid>

        <Button
          onClick={shareClicked}
          alignSelf="center"
          variant="primary"
          maxWidth="266px"
          leftIcon="copy"
        >
          Share profile
        </Button>

        <Text as="small" alignSelf="center" width="245px" fontWeight={500}>
          <div>Notice something wrong with this listing?</div>
          <Link
            href="mailto:social@rebuildblackbusiness.com"
            color={theme.colors.red[400]}
          >
            Send us an email and let us know.
          </Link>
        </Text>
      </Stack>
    </Layout>
  );
};

export default SingleBusinessPage;
