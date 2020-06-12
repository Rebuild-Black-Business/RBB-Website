import { Box, Icon, Text, useDisclosure, useTheme } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { forwardRef, useRef } from 'react';
import {
  CardButton,
  CardButtonGroup,
  CardContent,
  CardHeading,
  CardText,
  CardWrapper,
} from '../Card';
import Link from '../Link';
import ContactModal from '../ContactModal';

/**
 * @component
 * @example
 * return (
 *   <AllyCard
 *     name="Jane Example"
 *     email="example@example.com"
 *     specialty="Tech"
 *     location="Atlanta, GA"
 *   />
 * )
 */
const AllyCard = forwardRef(
  ({ first, last, email, specialty, location, ...props }, ref) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { updateRef } = useRef();
    const theme = useTheme();

    const name = `${first} ${last}`;

    return (
      <>
        <CardWrapper ref={ref} {...props}>
          <CardContent
            bg={theme.colors['rbb-white']}
            color={theme.colors['rbb-black-100']}
            display="flex"
            flexDirection="column"
          >
            <CardHeading
              fontFamily={theme.fonts['heading-slab']}
              textTransform="uppercase"
              fontSize={theme.fontSizes.xl}
              lineHeight="1"
              overflowWrap="break-word"
              wordWrap="break-word"
              wordBreak="break-word"
              hyphens="auto"
            >
              {name}
            </CardHeading>
            {location && (
              <CardText
                as="p"
                fontFamily={theme.fonts.heading}
                fontSize={theme.fontSizes.lg}
              >
                {location}
              </CardText>
            )}
            {specialty && (
              <CardText
                as="span"
                fontFamily={theme.fonts.heading}
                fontSize={theme.fontSizes.sm}
              >
                {specialty}
              </CardText>
            )}
            <Box marginTop="auto" paddingTop={theme.spacing.base}>
              <CardButtonGroup pb={3}>
                <CardButton as="a" href={`mailto:${email}`}>
                  Email
                </CardButton>
              </CardButtonGroup>
              <Text as="small" fontSize="sm" mt={3} isInline>
                <Icon
                  name="flag"
                  color={theme.colors['rbb-gray']}
                  mr={theme.spacing.xs}
                />
                <Link
                  as="button"
                  variant="cta"
                  onClick={onOpen}
                  ref={updateRef}
                >
                  Report or update
                </Link>
              </Text>
            </Box>
          </CardContent>
        </CardWrapper>

        <ContactModal
          isOpen={isOpen}
          title={`Report or Update the listing for "${name}"`}
          onClose={onClose}
        />
      </>
    );
  }
);

AllyCard.displayName = 'AllyCard';
AllyCard.propTypes = {
  specialty: PropTypes.string,
  first: PropTypes.string,
  last: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string.isRequired,
};
export { AllyCard };
export default AllyCard;
