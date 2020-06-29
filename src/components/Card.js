import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  AspectRatioBox,
  Box,
  Flex,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/core';
import URL from 'url-parse';
import { Button, Image } from '.';

function setUrlUtm(link) {
  let url = new URL(link);

  if (
    // Ensure that the link is external and follows http protocol (as opposed to mailto)
    !url.hostname.includes('rebuildblackbusiness.com') &&
    url.protocol.includes('http')
  ) {
    const query = url.query;

    if (!query.includes('?')) {
      // Set the one and only query
      url.set('query', { utm_source: 'Rebuild+Black+Business' }, false);
    } else if (!query.includes('utm_source')) {
      // Append if there are multiple queries and no utm_source
      url.set('query', url.query + '&utm_source=Rebuild+Black+Business', false);
    }
  }

  return url.href;
}

const CardWrapper = forwardRef(({ children, ...props }, ref) => {
  return (
    <Flex direction="column" overflow="hidden" {...props} ref={ref}>
      {children}
    </Flex>
  );
});

const CardImage = forwardRef(({ children, ...props }, ref) => {
  return (
    <AspectRatioBox ratio={3 / 2}>
      <Image
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="50% 50%"
        {...props}
        ref={ref}
      />
    </AspectRatioBox>
  );
});

const CardContent = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box p={{ base: 3, md: 6 }} flexGrow={1} {...props} ref={ref}>
      {children}
    </Box>
  );
});

const CardHeading = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      as={props => (
        <Heading
          {...props}
          fontSize={props.fontSize ? props.fontSize : '2xl'}
          as="h3"
        />
      )}
      mb={3}
      {...props}
      ref={ref}
    >
      {children}
    </Box>
  );
});

const CardText = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      as={props => <Text {...props} as="p" />}
      fontSize="md"
      {...props}
      ref={ref}
    >
      {children}
    </Box>
  );
});

const CardButtonGroup = forwardRef(({ children, ...props }, ref) => {
  return (
    <Stack
      isInline
      spacing={3}
      // as={props => <Sta {...props} spacing={4} />}
      alignItems="center"
      width="100%"
      {...props}
      ref={ref}
    >
      {children}
    </Stack>
  );
});

const CardButton = forwardRef(({ children, ...props }, ref) => {
  props.href = setUrlUtm(props.href);

  return (
    <Button flexGrow={1} variant="primary" {...props} ref={ref}>
      {children}
    </Button>
  );
});

const Card = forwardRef(({ children, ...props }, ref) => {
  return (
    <CardWrapper {...props} ref={ref}>
      {children}
    </CardWrapper>
  );
});

CardImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

CardWrapper.displayName = 'CardWrapper';
CardImage.displayName = 'CardImage';
CardContent.displayName = 'CardContent';
CardHeading.displayName = 'CardHeading';
CardText.displayName = 'CardText';
CardButtonGroup.displayName = 'CardButtonGroup';
CardButton.displayName = 'CardButton';
Card.displayName = 'Card';

export {
  CardWrapper,
  CardImage,
  CardContent,
  CardHeading,
  CardText,
  CardButtonGroup,
  CardButton,
  Card,
};
export default Card;
