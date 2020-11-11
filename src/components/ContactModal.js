import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/core';
import config from '../config';
import ErrorBoundary from './ErrorBoundary';
import ExternalLink from './ExternalLink';

const ContactModal = ({ isOpen, onClose, title }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader maxWidth="97%">{title}</ModalHeader>
      <ModalCloseButton />
      <ErrorBoundary>
        <ModalBody>
          Please send an email to{' '}
          <ExternalLink
            variant="standard"
            href={`mailto:${config.siteMetadata.social.contact}`}
          >
            {config.siteMetadata.social.contact}
          </ExternalLink>{' '}
          to report or remove this listing.
        </ModalBody>
      </ErrorBoundary>
    </ModalContent>
  </Modal>
);

ContactModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ContactModal;
