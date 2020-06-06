import React from 'react';
import {
  Flex,
  Image,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useTheme,
  Link,
} from '@chakra-ui/core';

const CardContent = ({ title, blurb }) => {
  const theme = useTheme();
  return (
    <Flex
      w="100%"
      direction="column"
      p="4"
      align="center"
      justify="center"
      textAlign="center"
    >
      <Text fontSize={theme.fontSizes.lg} fontFamily={theme.fonts.heading}>
        {title}
      </Text>
      <Text
        pt="3"
        fontSize={theme.fontSizes.paragraph}
        fontFamily={theme.fonts.heading}
      >
        {blurb}
      </Text>
    </Flex>
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
const CardImage = ({ imageUrl, imageAlt }) => (
  <Flex w="342px" h="220px">
    <Image width="100%" height="100%" src={imageUrl} alt={imageAlt} />
  </Flex>
);

// @TODO :: Add proper content to this modal. Probably pull this out into its own file seeing as its going to be a form
const ModalForm = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Some text here</ModalBody>
      <ModalFooter>
        <Button variantColor="blue" m={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const BusinessOwnerCard = ({
  imageUrl,
  imageAlt,
  modalTitle,
  title,
  blurb,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const focusRef = React.useRef();

  return (
    <>
      <Flex
        ref={focusRef}
        tabIndex={-1}
        as="button"
        maxW="342px"
        maxH="322px"
        direction="column"
        onClick={onOpen}
      >
        {imageUrl ? (
          <CardImage imageUrl={imageUrl} imageAlt={imageAlt} />
        ) : (
          <NoImage />
        )}
        <CardContent title={title} blurb={blurb} />
      </Flex>
      <ModalForm isOpen={isOpen} title={modalTitle} onClose={onClose} />
    </>
  );
};

const GeneralInquiryCard = ({ imageUrl, imageAlt, email, title, blurb }) => (
  <Flex
    as="a"
    href={`mailto:${email}`}
    isExternal
    maxW="342px"
    maxH="322px"
    direction="column"
  >
    {imageUrl ? (
      <CardImage imageUrl={imageUrl} imageAlt={imageAlt} />
    ) : (
      <NoImage />
    )}
    <CardContent title={title} blurb={blurb} />
  </Flex>
);

const VolunteerCard = ({ imageUrl, imageAlt, title, blurb }) => (
  <Flex
    as={Link}
    href="https://discord.com/invite/272XMuv"
    isExternal
    maxW="342px"
    maxH="322px"
    direction="column"
  >
    {imageUrl ? (
      <CardImage imageUrl={imageUrl} imageAlt={imageAlt} />
    ) : (
      <NoImage />
    )}
    <CardContent title={title} blurb={blurb} />
  </Flex>
);

/**
 * Contact Card for Business Owner - General Inquiry - Volunteers. Default renders the VolunteerCard
 *
 * @param {string} title - The cards title
 * @param {string} blurb - The cards blurb
 * @param {string} imageUrl - The images url
 * @param {string} imageAlt - The alt text for the image
 * @param {boolean} businessOwner - If businessOwner then card with modal will be displayed
 * @param {boolean} generalInquiry - If generalInquiry then card with mailto link will be displayed
 * @param {string} modalTitle - The title to be displayed in the modal
 * @param {string} email - The RBB support email address
 */
const ContactCard = ({
  title,
  blurb,
  imageUrl,
  imageAlt,
  businessOwnerCard,
  generalInquiryCard,
  modalTitle,
  email,
}) => {
  if (businessOwnerCard) {
    return (
      <BusinessOwnerCard
        modalTitle={modalTitle}
        title={title}
        blurb={blurb}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    );
  }
  if (generalInquiryCard) {
    return (
      <GeneralInquiryCard
        email={email}
        title={title}
        blurb={blurb}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    );
  }
  return <VolunteerCard title={title} blurb={blurb} imageUrl={imageUrl} />;
};

export default ContactCard;
