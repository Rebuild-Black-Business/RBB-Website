import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, Text, useTheme } from '@chakra-ui/core';

import {
  CardWrapper,
  CardImage,
  CardContent,
  CardHeading,
  CardText,
  CardButtonGroup,
  CardButton,
} from './Card';

import { zipcodeConversion } from '../utils/locationUtils';
import { toCamelCase } from '../utils/stringUtils';

// TODO: Replace with real fallback images for each category.
// This should all probably be defined in the database somewhere, eh?
const categoryData = {
  entertainment: {
    label: 'Entertainment',
    image: {
      src: 'assets/business-entertainment-option',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Learn more',
  },
  foodAndBeverage: {
    label: 'Food and Beverage',
    image: {
      src: 'assets/business-food-beverage',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Order',
  },
  healthAndWellness: {
    label: 'Health and Wellness',
    image: {
      src: 'assets/business-health',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Learn more',
  },
  professionalServices: {
    label: 'Professional Services',
    image: {
      src: 'assets/business-services',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Contact',
  },
  retail: {
    label: 'Retail',
    image: {
      src: 'assets/business-retail',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Shop',
  },
};

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
    const catVar = toCamelCase(category);
    const hasFallbackImage =
      category && Object.keys(categoryData).includes(catVar);
    const hasImage = !!(imageSrc || hasFallbackImage);
    const theme = useTheme();

    // I'm not sure how categories are going to work, so this probaably needs to
    // change. Also unsure how we're going to handle the schema category on the
    // card wrapee
    const categoryLabel =
      (categoryData[catVar] && categoryData[catVar].label) || category;
    const zipInfo = zipcodeConversion(location);
    const formattedCity = zipInfo ? `${zipInfo.city}, ${zipInfo.state}` : null;

    return (
      <CardWrapper
        ref={ref}
        {...props}
        // TODO: Use real theme colors per the design
        border={`1px solid ${theme.colors['rbb-gray']}`}
        itemScope
        // TODO: the category in Airtable isn't going to match the schema
        // category, will need to be fixed. Omitting for now.
        // itemType={`http://schema.org/${categoryLabel}`}
      >
        {hasImage && (
          <CardImage
            publicId={!imageSrc ? categoryData[catVar].image.src : null}
            src={imageSrc ? imageSrc : null}
            alt={imageAlt || categoryData[catVar].image.alt}
          />
        )}
        <CardContent
          bg={
            hasImage
              ? theme.colors['rbb-white']
              : theme.colors['rbb-result-card-grey']
          }
          color={hasImage ? undefined : theme.colors['rbb-black-200']}
        >
          <CardHeading itemprop="name">{name}</CardHeading>
          {category && <CardText as="span">{categoryLabel}</CardText>}
          {description && <CardText as="p">{description}</CardText>}
          {formattedCity && <CardText as="p">{formattedCity}</CardText>}
          <CardButtonGroup>
            <CardButton as="a" href={websiteUrl}>
              {(category && categoryData[category]?.buttonText) || 'Learn More'}
            </CardButton>
            {donationUrl && (
              <CardButton href={donationUrl} as="a">
                Donate
              </CardButton>
            )}
          </CardButtonGroup>
          <Text as="small" fontSize="sm" mt={3}>
            <Link href="#">Report or update</Link>
          </Text>
        </CardContent>
      </CardWrapper>
    );
  }
);

ResultCard.displayName = 'ResultCard';
ResultCard.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.number,
  websiteUrl: PropTypes.string.isRequired,
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
