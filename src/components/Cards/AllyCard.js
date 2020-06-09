import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  CardWrapper,
  CardContent,
  CardHeading,
  CardText,
  CardButton,
  CardButtonGroup,
} from '../Card';
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
import { zipcodeConversion } from '../../utils/locationUtils';
import Link from '../Link';
import Button from '../Button';

// @TODO :: Add proper content to this modal. Probably pull this out into its own file seeing as its going to be a form
const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
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
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { reportRef, updateRef } = useRef();
    const theme = useTheme();

    const zipInfo = zipcodeConversion(location);
    const formattedCity = zipInfo ? `${zipInfo.city}, ${zipInfo.state}` : null;

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

AllyCard.displayName = 'AllyCard';
AllyCard.propTypes = {
  specialty: PropTypes.string,
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  email: PropTypes.string.isRequired,
};
export { AllyCard };
export default AllyCard;
