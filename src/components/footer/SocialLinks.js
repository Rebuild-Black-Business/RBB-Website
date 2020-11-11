import { Flex } from '@chakra-ui/core';
import config from '../../config';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { Envelope } from './../SVG/Envelope';
import { Facebook } from './../SVG/Facebook';
import { Instagram } from './../SVG/Instagram';
import { Twitter } from './../SVG/Twitter';

const SocialLinks = () => {
  // @TODO: add paypal link to config and here once it is ready
  return (
    <ErrorBoundary>
      <Flex
        w={['90%', '80%']}
        justify="space-evenly"
        mr={[0, 0, 0, 2]}
        ml={[0, 0, 0, 2]}
      >
        <Facebook
          link={`https://facebook.com/${config.siteMetadata.social.fbAppID}`}
        />
        <Instagram
          link={`https://instagram.com/${config.siteMetadata.social.instagram}`}
        />
        <Twitter
          link={`https://twitter.com/${config.siteMetadata.social.twitter}`}
        />
        <Envelope link={`mailto:${config.siteMetadata.social.contact}`} />
      </Flex>
    </ErrorBoundary>
  );
};

export default SocialLinks;
