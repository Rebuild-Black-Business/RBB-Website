import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  CardWrapper,
  CardContent,
  CardHeading,
  CardText,
  CardButton,
  CardButtonGroup,
} from '../Card';
import { Text, Box, Icon, useTheme } from '@chakra-ui/core';
import { zipcodeConversion } from '../../utils/locationUtils';
import Link from '../Link';

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
  ({ name, email, specialty, location, ...props }, ref) => {
    const zipInfo = zipcodeConversion(location);
    const formattedCity = zipInfo ? `${zipInfo.city}, ${zipInfo.state}` : null;
    const theme = useTheme();

    console.log(specialty);

    return (
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
          {formattedCity && (
            <CardText
              as="p"
              fontFamily={theme.fonts.heading}
              fontSize={theme.fontSizes.lg}
            >
              {formattedCity}
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
          <CardButtonGroup>
            <CardButton as="a" href={`mailto:${email}`}>
              Email
            </CardButton>
          </CardButtonGroup>
          <Box marginTop="auto" paddingTop={theme.spacing.base}>
            <Text as="small" fontSize="sm" fontStyle="italic" mt={3} isInline>
              <Icon
                name="flag"
                color={theme.colors['rbb-gray']}
                mr={theme.spacing.xs}
              />
              <Link variant="cta" to="#">
                Report
              </Link>{' '}
              or{' '}
              <Link variant="cta" to="#">
                update
              </Link>
            </Text>
          </Box>
        </CardContent>
      </CardWrapper>
    );
  }
);

AllyCard.displayName = 'AllyCard';
AllyCard.propTypes = {
  specialty: PropTypes.string,
  name: PropTypes.string.isRequired,
  location: PropTypes.number,
  email: PropTypes.string.isRequired,
};
export { AllyCard };
export default AllyCard;
