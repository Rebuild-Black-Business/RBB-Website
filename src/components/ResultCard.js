import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  CardWrapper,
  CardImage,
  CardContent,
  CardHeading,
  CardText,
  CardButtonGroup,
  CardButton,
} from './Card';
import { Link, Text } from '@chakra-ui/core';

// TODO: Replace with real fallback images for each category.
// This should all probably be defined in the database somewhere, eh?
const categoryData = {
  entertainment: {
    label: 'Entertainment',
    image: {
      src: 'https://source.unsplash.com/random',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Learn more',
  },
  foodAndBeverage: {
    label: 'Food and Beverage',
    image: {
      src: 'https://source.unsplash.com/random',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Order',
  },
  healthAndWellness: {
    label: 'Health and Wellness',
    image: {
      src: 'https://source.unsplash.com/random',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Learn more',
  },
  professionalServices: {
    label: 'Professional Services',
    image: {
      src: 'https://source.unsplash.com/random',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Contact',
  },
  retail: {
    label: 'Retail',
    image: {
      src: 'https://source.unsplash.com/random',
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
    const hasFallbackImage =
      category && Object.keys(categoryData).includes(category);
    const hasImage = !!(imageSrc || hasFallbackImage);

    // I'm not sure how categories are going to work, so this probaably needs to
    // change. Also unsure how we're going to handle the schema category on the
    // card wrapee
    const categoryLabel =
      (categoryData[category] && categoryData[category].label) || category;
    return (
      <CardWrapper
        ref={ref}
        {...props}
        // TODO: Use real theme colors per the design
        border="1px solid gray"
        itemScope
        // TODO: the category in Airtable isn't going to match the schema
        // category, will need to be fixed. Omitting for now.
        // itemType={`http://schema.org/${categoryLabel}`}
      >
        {hasImage && (
          <CardImage
            src={imageSrc || categoryData[category].image.src}
            alt={imageSrc ? imageAlt : categoryData[category].image.alt}
          />
        )}
        <CardContent
          // TODO: Use real theme colors per the design
          bg={hasImage ? 'white' : '#555'}
          color={hasImage ? undefined : 'white'}
        >
          <CardHeading itemprop="name">{name}</CardHeading>
          {category && <CardText as="span">{categoryLabel}</CardText>}
          {description && <CardText as="p">{description}</CardText>}
          <CardText as="p">{location}</CardText>
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
          <Text as="small" fontSize="sm" fontStyle="italic" mt={3}>
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
  location: PropTypes.number.isRequired,
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
