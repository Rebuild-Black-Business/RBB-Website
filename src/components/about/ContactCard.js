import {
  Box,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PseudoBox,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/core';
import React from 'react';
import Image from '../../components/Image.js';
import { VOLUNTEER_URL } from '../../constants/about';
import BusinessSignUpForm from '../Forms/BusinessSignUpForm.js';
import SuggestionBox from '../Forms/SuggestionBox.js';

const CardContent = ({ title, blurb, publicId, alt, transforms = {} }) => {
  const theme = useTheme();
  return (
    <>
      {publicId ? (
        <CardImage publicId={publicId} transforms={transforms} alt={alt} />
      ) : (
        <NoImage />
      )}
      <Flex
        w="100%"
        direction="column"
        p="4"
        align="center"
        justify="center"
        textAlign="center"
        backgroundColor={theme.colors['rbb-black-100']}
      >
        <Heading
          color="white"
          fontFamily={theme.fonts.heading}
          as="h3"
          size="md"
        >
          {title}
        </Heading>
        <Text
          p="2"
          fontSize={theme.fontSizes.paragraph}
          fontFamily={theme.fonts.heading}
          color={theme.colors['rbb-white']}
        >
          {blurb}
        </Text>
      </Flex>
    </>
  );
};

// @TODO :: Add a fallback image to be displayed incase of no image
const NoImage = () => (
  <Box maxW="342px" maxH="220px" bg="#414A4C">
    <Flex justify="center" align="center">
      <p>No image available</p>
    </Flex>
  </Box>
);

// @TODO :: Replace with new Image component
const CardImage = ({ publicId, transforms, alt }) => {
  return (
    <Flex w="100%" minH="220px" position="relative" overflow="hidden">
      <Image publicId={publicId} transforms={{ ...transforms }} alt={alt} />
    </Flex>
  );
};

const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SuggestionBox />
      </ModalBody>
    </ModalContent>
  </Modal>
);

const ModalCard = ({
  publicId,
  alt,
  modalTitle,
  title,
  blurb,
  margin,
  transforms = {},
  suggestions,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const focusRef = React.useRef();

  return (
    <>
      <Flex
        as="a"
        href="#"
        ref={focusRef}
        maxH="322px"
        direction="column"
        onClick={onOpen}
        marginBottom={margin}
      >
        <CardContent
          title={title}
          blurb={blurb}
          publicId={publicId}
          alt={alt}
          transforms={transforms}
        />
      </Flex>
      <ModalForm
        isOpen={isOpen}
        title={modalTitle}
        onClose={onClose}
        suggestions={suggestions}
      />
    </>
  );
};

const MailtoCard = ({
  publicId,
  alt,
  email,
  title,
  blurb,
  transforms = {},
}) => (
  <Flex
    as="a"
    href={`mailto:${email}`}
    isExternal
    maxH="322px"
    direction="column"
  >
    <CardContent
      title={title}
      blurb={blurb}
      publicId={publicId}
      alt={alt}
      transforms={transforms}
    />
  </Flex>
);

const VolunteerCard = ({ publicId, alt, title, blurb, transforms = {} }) => (
  <Flex
    as={Link}
    href={VOLUNTEER_URL}
    isExternal
    maxH="322px"
    direction="column"
  >
    <CardContent
      title={title}
      blurb={blurb}
      publicId={publicId}
      alt={alt}
      transforms={transforms}
    />
  </Flex>
);

/**
 * Contact Card for Business Owner - General Inquiry - Volunteers. Default renders the VolunteerCard
 *
 * @param {string} title - The cards title
 * @param {string} blurb - The cards blurb
 * @param {string} publicId - The images url
 * @param {string} cloudName - The alt text for the image
 * @param {boolean} modalCard - If doesModal then card with modal will be displayed
 * @param {boolean} mailtoCard - If doesMailto then card with mailto link will be displayed
 * @param {string} modalTitle - The title to be displayed in the modal
 * @param {string} email - The RBB support email address
 * @param {object} transforms - Image transformations
 */
const ContactCard = ({
  title,
  blurb,
  publicId,
  alt,
  modalCard,
  mailtoCard,
  modalTitle,
  email,
  transforms = {},
  suggestions,
}) => {
  const cardStyle = {
    hover: {
      transform: 'scale(1.03)',
      transition: 'all .25s ease-in',
    },
    focus: {
      transform: 'scale(1.03)',
    },
  };

  if (modalCard) {
    return (
      <PseudoBox _hover={cardStyle.hover} _focus={cardStyle.focus}>
        <ModalCard
          modalTitle={modalTitle}
          title={title}
          blurb={blurb}
          publicId={publicId}
          alt={alt}
          transforms={transforms}
        />
      </PseudoBox>
    );
  }
  if (mailtoCard) {
    return (
      <PseudoBox _hover={cardStyle.hover} _focus={cardStyle.focus}>
        <MailtoCard
          email={email}
          title={title}
          blurb={blurb}
          publicId={publicId}
          alt={alt}
          transforms={transforms}
        />
      </PseudoBox>
    );
  }
  return (
    <PseudoBox _hover={cardStyle.hover} _focus={cardStyle.focus}>
      <VolunteerCard
        title={title}
        blurb={blurb}
        publicId={publicId}
        alt={alt}
        transforms={transforms}
      />
    </PseudoBox>
  );
};

export default ContactCard;
