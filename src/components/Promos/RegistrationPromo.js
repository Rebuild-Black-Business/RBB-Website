import React, { useRef } from 'react';
import { useTheme, Box } from '@chakra-ui/core';
import { CardWrapper, CardHeading, CardText, CardContent } from '../Card';
import Button from '../Button';
import Image from '../Image';

export default function RegistrationPromo({ onOpen }) {
  const focusRef = useRef();
  const theme = useTheme();

  return (
    <CardWrapper pos="relative">
      <Image
        publicId="assets/looking-up_whbkeh.jpg"
        objectFit="cover"
        pos="absolute"
        zIndex="-1"
        w="100%"
        h="100%"
        top="0"
        left="0"
        alt="looking-ip_whbkeh"
      />
      <CardContent
        color={theme.colors['rbb-black-200']}
        display="flex"
        flexDirection="column"
        h="100%"
        justifyContent="space-between"
      >
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
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
            mb={theme.spacing.lg}
            fontWeight={theme.fontWeights[900]}
          >
            Add a business
          </CardHeading>
          <CardText
            as="p"
            fontFamily={theme.fonts.heading}
            fontSize={theme.fontSizes.base}
            mb={theme.spacing.lg}
          >
            If you are a business owner that has been impacted, please send us
            your information. New submissions are added every 24 hours.
          </CardText>
        </Box>
        <Button
          variant="cta"
          mt={theme.spacing.base}
          onClick={onOpen}
          ref={focusRef}
          mb={theme.spacing.lg}
        >
          Register
        </Button>
      </CardContent>
    </CardWrapper>
  );
}
