import {
  Box,
  Heading,
  Icon,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import ContactModal from '../components/ContactModal';
import Link from '../components/Link';

import { Link as GatsbyLink } from 'gatsby';

import {
  CardButton,
  CardButtonGroup,
  CardContent,
  CardImage,
  CardText,
  CardWrapper,
} from './Card';

import {
  getSlugForBusiness,
  useImageForBusiness,
  useCategoryMetadataForBusiness,
} from '../utils/business';

const DESCRIPTION_MAX_LENGTH = 250; // length in characters after which we'll trim descriptions

/**
 * @component
 * @example
 * return (
 *   <ResultCard
 *     category="foodAndBeverage"
 *     name="Dad's Donuts"
 *     description="Blah blah blaaaah"
 *     location="Atlanta, GA"
 *     websiteUrl="https://dobusiness.com"
 *     donationUrl="https://donatemoney.com"
 *     imageSrc="https://imagesrc.jpg"
 *     imageAlt="cool image you got there"
 *   />
 * )
 */
const ResultCard = forwardRef(
  (
    {
      airTableId,
      children,
      imageSrc,
      imageAlt,
      category,
      name,
      description,
      location,
      websiteUrl,
      donationUrl,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const { onOpen, isOpen, onClose } = useDisclosure();

    const { hasImage, publicId, src, alt } = useImageForBusiness({
      category,
      imageAlt,
      imageSrc,
    });

    const { categoryLabel, buttonText } = useCategoryMetadataForBusiness(
      category
    );

    const businessPageSlug = getSlugForBusiness({
      name: name,
      businessName: name,
      airtableId: airTableId,
    });

    const businessPageUrl = businessPageSlug
      ? `/business/${businessPageSlug}`
      : null;

    return (
      <CardWrapper
        ref={ref}
        {...props}
        itemScope
        // TODO: the category in Airtable isn't going to match the schema
        // category, will need to be fixed. Omitting for now.
        // itemType={`http://schema.org/${categoryLabel}`}
      >
        {hasImage && (
          <CardImage
            publicId={publicId}
            src={src}
            alt={alt}
            transforms={{ width: 500, height: 350, crop: 'fit', dpr: 2 }}
          />
        )}
        <CardContent
          d="flex"
          flexDirection="column"
          bg={theme.colors['rbb-result-card-grey']}
          color={hasImage ? undefined : theme.colors['rbb-black-200']}
        >
          <Heading
            as="h2"
            itemprop="name"
            size="md"
            fontWeight="normal"
            wordBreak="break-word"
            overflowWrap="break-word"
            fontFamily={theme.fonts['heading-slab']}
          >
            {businessPageUrl ? (
              <Link variant="standard" to={businessPageUrl}>
                {name}
              </Link>
            ) : (
              `${name}`
            )}
          </Heading>
          {category && (
            <CardText
              as="span"
              margin="1rem 0"
              color={theme.colors['rbb-gray']}
            >
              {categoryLabel}
            </CardText>
          )}
          {description && (
            <CardText
              as="p"
              fontSize="1em"
              lineHeight="1.25rem"
              fontFamily="Arvo"
            >
              {description.substr(0, DESCRIPTION_MAX_LENGTH)}
              {description.length === DESCRIPTION_MAX_LENGTH && '...'}
              {''}
            </CardText>
          )}
          {location && (
            <CardText
              as="p"
              fontSize="1em"
              lineHeight="1.25rem"
              fontFamily="Arvo"
            >
              {location}
            </CardText>
          )}
          {/* TODO: spacing={0} and wrap="wrap" are added temporarily.  Fix this and replace it with <Wrap/> component in newer Chakra-UI version */}
          <CardButtonGroup
            mt="auto"
            mb={theme.spacing.base}
            pt={theme.spacing.base}
            spacing={0}
            wrap="wrap"
          >
            {businessPageUrl && (
              <CardButton
                as={GatsbyLink}
                to={businessPageUrl}
                style={{
                  /* @TODO: primary buttons should be white! */
                  color: theme.colors['rbb-white'],
                }}
              >
                {buttonText}
              </CardButton>
            )}
            {donationUrl && (
              <CardButton
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                as="a"
                style={{
                  /* @TODO: primary buttons should be white! */
                  color: theme.colors['rbb-white'],
                }}
              >
                Donate
              </CardButton>
            )}
          </CardButtonGroup>
          <Box>
            <Text as="small" fontSize="sm" isInline>
              <Icon
                name="flag"
                color={theme.colors['rbb-gray']}
                mr={theme.spacing.xs}
              />
              <Link as="button" variant="cta" onClick={onOpen}>
                Report or update
              </Link>
            </Text>
          </Box>
        </CardContent>

        <ContactModal
          isOpen={isOpen}
          title={`Report or Update the listing for "${name}"`}
          onClose={onClose}
        />
      </CardWrapper>
    );
  }
);

ResultCard.displayName = 'ResultCard';
ResultCard.propTypes = {
  airTableId: PropTypes.string,
  category: PropTypes.object,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string,
  websiteUrl: PropTypes.string,
  donationUrl: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: (props, name, compName, _, propName) => {
    let hasImage = props.imageSrc != null;
    let val = props[name];
    if (hasImage && typeof val === 'undefined') {
      return new Error(
        `If the \`imageSrc\` prop is provided to the \`${compName}\` component, the \`${propName}\` prop is required. If the image is purely decorative and should be ignored by assistive technology, pass an empty string to the \`${propName}\` prop.`
      );
    } else if (hasImage && typeof val !== 'string') {
      let isNull = val == null;
      let isArray = Array.isArray(val);
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${compName}\`. Expected \`string\`, received \`${
          isArray ? 'array' : isNull ? 'null' : typeof val
        }\`.`
      );
    }
    return null;
  },
};
export { ResultCard };
export default ResultCard;
