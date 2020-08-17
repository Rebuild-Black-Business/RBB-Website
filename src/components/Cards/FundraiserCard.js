import React, { forwardRef, useRef } from 'react';
import { Box, Icon, Text, useDisclosure, useTheme } from '@chakra-ui/core';
import PropTypes from 'prop-types';
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
 *   <FundraiserCard
 *     name="Jane Example"
 *     donationLink="https://somedonation.link"
 *   />
 * )
 */

const FundraiserCard = forwardRef(({ name, donationLink, ...props }, ref) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { updateRef } = useRef();
  const theme = useTheme();

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
          {/* {location && (
            <CardText
              as="p"
              fontFamily={theme.fonts.heading}
              fontSize={theme.fontSizes.lg}
            >
              {location}
            </CardText>
          )} */}

          <Box marginTop="auto" paddingTop={theme.spacing.base}>
            <CardButtonGroup pb={3}>
              <CardButton as="a" href={donationLink}>
                Donate
              </CardButton>
            </CardButtonGroup>
            <Text as="small" fontSize="sm" mt={3} isInline>
              <Icon
                name="flag"
                color={theme.colors['rbb-gray']}
                mr={theme.spacing.xs}
              />
              <Link as="button" variant="cta" ref={updateRef} onClick={onOpen}>
                Report
              </Link>
            </Text>
          </Box>
        </CardContent>
      </CardWrapper>
      <ContactModal
        isOpen={isOpen}
        title={`Report or Unlist the listing for "${name}"`}
        onClose={onClose}
      />
    </>
  );
});

FundraiserCard.displayName = 'FundraiserCard';
FundraiserCard.propTypes = {
  name: PropTypes.string,
  donationLink: PropTypes.string.isRequired,
};

export default FundraiserCard;
