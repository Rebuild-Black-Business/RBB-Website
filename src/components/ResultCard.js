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

const ResultCard = forwardRef(
  (
    {
      children,
      imageSrc,
      imageAlt,
      businessCategory,
      businessName,
      businessDescription,
      businessLocation,
      businessUrl,
      donationUrl,
      ...props
    },
    ref
  ) => {
    const hasFallbackImage =
      businessCategory && Object.keys(categoryData).includes(businessCategory);
    const hasImage = !!(imageSrc || hasFallbackImage);
    return (
      <CardWrapper
        ref={ref}
        {...props}
        // TODO: Use real theme colors per the design
        border="1px solid gray"
      >
        {hasImage && (
          <CardImage
            src={imageSrc || categoryData[businessCategory].image.src}
            alt={imageSrc ? imageAlt : categoryData[businessCategory].image.alt}
          />
        )}
        <CardContent
          // TODO: Use real theme colors per the design
          bg={hasImage ? 'white' : '#555'}
          color={hasImage ? undefined : 'white'}
        >
          <CardHeading>{businessName}</CardHeading>
          {businessCategory && (
            <CardText as="span">
              {(categoryData[businessCategory] &&
                categoryData[businessCategory].label) ||
                businessCategory}
            </CardText>
          )}
          {businessDescription && (
            <CardText as="p">{businessDescription}</CardText>
          )}
          <CardText as="p">{businessLocation}</CardText>
          <CardButtonGroup>
            <CardButton as="a" href={businessUrl} minWidth="50%">
              {(businessCategory &&
                categoryData[businessCategory]?.buttonText) ||
                'Learn More'}
            </CardButton>
            {donationUrl && (
              <CardButton href={donationUrl} as="a" minWidth="50%">
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
  businessCategory: PropTypes.string,
  businessName: PropTypes.string.isRequired,
  businessDescription: PropTypes.string,
  businessLocation: PropTypes.string.isRequired,
  businessUrl: PropTypes.string.isRequired,
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
