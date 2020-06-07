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

const CardContent = ({ title, blurb, imageUrl, imageAlt }) => {
  const theme = useTheme();
  return (
    <>
      {imageUrl ? (
        <CardImage imageUrl={imageUrl} imageAlt={imageAlt} />
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
        backgroundColor="#001514"
      >
        <Text
          color="white"
          fontSize={[
            theme.fontSizes.md,
            theme.fontSizes.md,
            theme.fontSizes.lg,
            theme.fontSizes.lg,
          ]}
          fontFamily={theme.fonts.heading}
        >
          {title}
        </Text>
        <Text
          p="4"
          fontSize={[
            theme.fontSizes.sm,
            theme.fontSizes.sm,
            theme.fontSizes.md,
            theme.fontSizes.md,
          ]}
          fontFamily={theme.fonts.heading}
          height="90px"
          color="#F7F7F2"
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
const CardImage = ({ imageUrl, imageAlt }) => (
  <Flex maxW="342px" maxH="220px">
    <Image
      objectFit="cover"
      // width="100%"
      // height="100%"
      src={imageUrl}
      alt={imageAlt}
    />
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

const ModalCard = ({ imageUrl, imageAlt, modalTitle, title, blurb }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const focusRef = React.useRef();

  return (
    <>
      <Flex
        ref={focusRef}
        tabIndex={-1}
        as="button"
        margin="10% auto"
        maxW={['297px', '297px', '342px', '342px']}
        maxH={['474px', '474px', '322px', '322px']}
        // maxW="342px"
        // maxH="322px"
        direction="column"
        onClick={onOpen}
      >
        <CardContent
          title={title}
          blurb={blurb}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
        />
      </Flex>
      <ModalForm isOpen={isOpen} title={modalTitle} onClose={onClose} />
    </>
  );
};

const MailtoCard = ({ imageUrl, imageAlt, email, title, blurb }) => (
  <Flex
    margin="10% auto"
    as="a"
    href={`mailto:${email}`}
    isExternal
    maxW={['297px', '297px', '342px', '342px']}
    maxH={['474px', '474px', '322px', '322px']}
    direction="column"
  >
    <CardContent
      title={title}
      blurb={blurb}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
    />
  </Flex>
);

const VolunteerCard = ({ imageUrl, imageAlt, title, blurb }) => (
  <Flex
    as={Link}
    href="https://discord.com/invite/272XMuv"
    isExternal
    margin="10% auto"
    maxW={['297px', '297px', '342px', '342px']}
    maxH={['474px', '474px', '322px', '322px']}
    direction="column"
  >
    <CardContent
      title={title}
      blurb={blurb}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
    />
  </Flex>
);

/**
 * Contact Card for Business Owner - General Inquiry - Volunteers. Default renders the VolunteerCard
 *
 * @param {string} title - The cards title
 * @param {string} blurb - The cards blurb
 * @param {string} imageUrl - The images url
 * @param {string} imageAlt - The alt text for the image
 * @param {boolean} modalCard - If doesModal then card with modal will be displayed
 * @param {boolean} mailtoCard - If doesMailto then card with mailto link will be displayed
 * @param {string} modalTitle - The title to be displayed in the modal
 * @param {string} email - The RBB support email address
 */
const ContactCard = ({
  title,
  blurb,
  imageUrl,
  imageAlt,
  modalCard,
  mailtoCard,
  modalTitle,
  email,
}) => {
  if (modalCard) {
    return (
      <ModalCard
        modalTitle={modalTitle}
        title={title}
        blurb={blurb}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    );
  }
  if (mailtoCard) {
    return (
      <MailtoCard
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
