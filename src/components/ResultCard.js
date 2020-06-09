import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  CardWrapper,
  CardImage,
  CardContent,
  CardHeading,
  CardText,
  CardButton,
  CardButtonGroup,
} from './Card';
import {
  Text,
  Box,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useTheme,
  useDisclosure,
} from '@chakra-ui/core';
import { zipcodeConversion } from '../utils/locationUtils';
import { toCamelCase } from '../utils/stringUtils';

import Button from './Button';
import Link from './Link';

// @TODO :: Add proper content to this modal. Probably pull this out into its own file seeing as its going to be a form
const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader pr="3rem">{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Message for reporting or updating here</ModalBody>
      <ModalFooter>
        <Button variantColor="blue" m={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

// TODO: Replace with real fallback images for each category.
// This should all probably be defined in the database somewhere, eh?
const categoryData = {
  entertainment: {
    label: 'Entertainment',
    image: {
      src: 'assets/business-entertainment-option',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Explore',
  },
  foodAndBeverage: {
    label: 'Food and Beverage',
    image: {
      src: 'assets/business-food-beverage',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Order',
  },
  professionalServices: {
    label: 'Professional Services',
    image: {
      src: 'assets/business-services',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Shop',
  },
  retail: {
    label: 'Retail',
    image: {
      src: 'assets/business-retail',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Shop',
  },
  healthAndWellness: {
    label: 'Health and Wellness',
    image: {
      src: 'assets/business-health',
      alt: 'Id facilisis dictum consequat sit orci.',
    },
    buttonText: 'Explore',
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
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { reportRef, updateRef } = useRef();
    const theme = useTheme();
    const catVar = toCamelCase(category);

    // I'm not sure how categories are going to work, so this probaably needs to
    // change. Also unsure how we're going to handle the schema category on the
    // card wrapee
    const categoryLabel =
      (categoryData[category] && categoryData[category].label) || category;
    const zipInfo = zipcodeConversion(location);
    const formattedCity = zipInfo ? `${zipInfo.city}, ${zipInfo.state}` : null;

    let img;
    if (imageSrc) {
      img = <CardImage src={imageSrc} alt={imageAlt} />;
    } else {
      img = (
        <CardImage
          isRBBImage
          publicId={categoryData[catVar].image.src}
          alt={categoryData[catVar].image.alt}
        />
      );
    }

    return (
      <>
        <CardWrapper
          ref={ref}
          {...props}
          itemScope
          // TODO: the category in Airtable isn't going to match the schema
          // category, will need to be fixed. Omitting for now.
          // itemType={`http://schema.org/${categoryLabel}`}
        >
          {img}
          <CardContent
            // TODO: Use real theme colors per the design
            bg="#DEDEDA"
            color={theme.colors['rbb-black-100']}
            fontFamily={theme.fonts.heading}
            display="flex"
            flexDirection="column"
          >
            <CardHeading itemprop="name" fontSize="lg" fontWeight="normal">
              {name}
            </CardHeading>
            {category && (
              <CardText
                as="span"
                fontSize="sm"
                color={theme.colors['rbb-gray']}
                mb={theme.spacing.xs}
              >
                {categoryLabel}
              </CardText>
            )}
            {description && (
              <CardText as="p" isTruncated>
                {description}
              </CardText>
            )}
            {formattedCity && <CardText as="p">{formattedCity}</CardText>}
            <CardButtonGroup marginTop="auto" paddingTop={theme.spacing.base}>
              <CardButton as="a" href={websiteUrl}>
                {(category && categoryData[catVar]?.buttonText) || 'Learn More'}
              </CardButton>
              {donationUrl && (
                <CardButton href={donationUrl} as="a">
                  Donate
                </CardButton>
              )}
            </CardButtonGroup>
            <Box paddingTop={theme.spacing.base}>
              <Text as="small" fontSize="sm" fontStyle="italic" mt={3} isInline>
                <Icon
                  name="flag"
                  color={theme.colors['rbb-gray']}
                  mr={theme.spacing.xs}
                />
                <Link
                  as="button"
                  variant="cta"
                  onClick={onOpen}
                  ref={reportRef}
                >
                  Report
                </Link>{' '}
                or{' '}
                <Link
                  as="button"
                  variant="cta"
                  onClick={onOpen}
                  ref={updateRef}
                >
                  update
                </Link>
              </Text>
            </Box>
          </CardContent>
        </CardWrapper>

        <ModalForm
          isOpen={isOpen}
          title={`Report or Update the listing for "${name}"`}
          onClose={onClose}
        />
      </>
    );
  }
);

ResultCard.displayName = 'ResultCard';
ResultCard.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string,
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
