import React from 'react';
import { PseudoBox, Box, Image, Flex, theme } from '@chakra-ui/core';

const fullWidthOverlayOpacity = 0.3;

const formatHexCode = hexCode => {
  if (!hexCode.startsWith('#')) {
    return false;
  }

  // Using 3 digit hex
  if (hexCode.length === 4) {
    return `#${hexCode[1]}${hexCode[1]}${hexCode[2]}${hexCode[2]}${hexCode[3]}${hexCode[3]}`;
  }

  return hexCode;
};

const ContentBlockContent = props => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100%"
      w="100%"
      px={[4, 4, 8]}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

const ContentBlockColorOverlay = ({ backgroundColor, ...props }) => {
  return (
    <Box
      pos="absolute"
      top="0"
      right="0"
      bottom="0"
      left="0"
      opacity={fullWidthOverlayOpacity}
      backgroundColor={backgroundColor}
      zIndex="-1"
      {...props}
    />
  );
};

const ContentBlockWrapper = ({
  imageSource,
  imageWidth = '100%',
  imagePosition = { left: 0 },
  ...props
}) => {
  return (
    <PseudoBox
      as="div"
      d="flex"
      w="100%"
      pos="relative"
      textAlign="center"
      _before={{
        backgroundImage: imageSource,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        width: imageWidth,
        height: '100%',
        zIndex: -2,
        ...imagePosition,
      }}
      {...props}
    >
      {props.children}
    </PseudoBox>
  );
};

const LeftSideContentBlock = ({
  imageSource,
  backgroundColor,
  backgroundMode,
  ...props
}) => {
  /**
   * Determine backgroundColor with alpha
   */
  let hexbackgroundColor;
  if (theme.colors[backgroundColor]) {
    hexbackgroundColor = formatHexCode(theme.colors[backgroundColor]);
  } else {
    const hexCode = formatHexCode(backgroundColor);
    if (hexCode) {
      hexbackgroundColor = hexCode;
    }
  }

  const isTint = backgroundMode === 'tint';
  if (isTint) {
    return (
      <ContentBlockWrapper
        imageSource={imageSource}
        textAlign={['center', 'center', 'left']}
      >
        <ContentBlockColorOverlay
          backgroundColor={backgroundColor}
        ></ContentBlockColorOverlay>
        <ContentBlockContent w={['100%', '100%', '50%']} mr="auto">
          {props.children}
        </ContentBlockContent>
      </ContentBlockWrapper>
    );
  } else {
    return (
      <ContentBlockWrapper
        imageSource={imageSource}
        imageWidth={['100%', '100%', '55%']}
        imagePosition={{ right: 0 }}
        textAlign={['center', 'center', 'left']}
      >
        <ContentBlockColorOverlay
          backgroundMode={backgroundMode}
          right={['0', '0', '45%']}
          opacity={[fullWidthOverlayOpacity, fullWidthOverlayOpacity, 1]}
          background={[
            backgroundColor,
            backgroundColor,
            `linear-gradient(90deg, ${hexbackgroundColor}ff 90%, ${hexbackgroundColor}00 100%)`,
          ]}
        ></ContentBlockColorOverlay>
        <ContentBlockContent w={['100%', '100%', '50%']} mr="auto">
          {props.children}
        </ContentBlockContent>
      </ContentBlockWrapper>
    );
  }
};

const RightSideContentBlock = ({
  imageSource,
  backgroundColor,
  backgroundMode,
  ...props
}) => {
  /**
   * Determine backgroundColor with alpha
   */
  let hexbackgroundColor;
  if (theme.colors[backgroundColor]) {
    hexbackgroundColor = formatHexCode(theme.colors[backgroundColor]);
  } else {
    const hexCode = formatHexCode(backgroundColor);
    if (hexCode) {
      hexbackgroundColor = hexCode;
    }
  }

  const isTint = backgroundMode === 'tint';
  if (isTint) {
    return (
      <ContentBlockWrapper
        imageSource={imageSource}
        textAlign={['center', 'center', 'left']}
      >
        <ContentBlockColorOverlay
          backgroundColor={backgroundColor}
        ></ContentBlockColorOverlay>
        <ContentBlockContent w={['100%', '100%', '50%']} ml="auto">
          {props.children}
        </ContentBlockContent>
      </ContentBlockWrapper>
    );
  } else {
    return (
      <ContentBlockWrapper
        imageSource={imageSource}
        imageWidth={['100%', '100%', '55%']}
        textAlign={['center', 'center', 'left']}
      >
        <ContentBlockColorOverlay
          backgroundMode={backgroundMode}
          left={['0', '0', '45%']}
          opacity={[fullWidthOverlayOpacity, fullWidthOverlayOpacity, 1]}
          background={[
            backgroundColor,
            backgroundColor,
            `linear-gradient(270deg, ${hexbackgroundColor}ff 90%, ${hexbackgroundColor}00 100%)`,
          ]}
        ></ContentBlockColorOverlay>
        <ContentBlockContent w={['100%', '100%', '50%']} ml="auto">
          {props.children}
        </ContentBlockContent>
      </ContentBlockWrapper>
    );
  }
};

const FullWidthContentBlock = ({
  layout,
  imageSource,
  backgroundColor,
  backgroundMode,
  ...props
}) => {
  return (
    <ContentBlockWrapper imageSource={imageSource}>
      <ContentBlockColorOverlay backgroundColor={backgroundColor} />
      <ContentBlockContent layout={layout} backgroundMode={backgroundMode}>
        {props.children}
      </ContentBlockContent>
    </ContentBlockWrapper>
  );
};

const ContentBlock = ({
  layout = 'full',
  backgroundColor = '#000000',
  backgroundMode = 'tint',
  ...props
}) => {
  switch (layout) {
    case 'left':
      return (
        <LeftSideContentBlock
          backgroundColor={backgroundColor}
          backgroundMode={backgroundMode}
          {...props}
        ></LeftSideContentBlock>
      );
    case 'right':
      return (
        <RightSideContentBlock
          backgroundColor={backgroundColor}
          backgroundMode={backgroundMode}
          {...props}
        ></RightSideContentBlock>
      );
    default:
      return (
        <FullWidthContentBlock
          backgroundColor={backgroundColor}
          backgroundMode={backgroundMode}
          {...props}
        />
      );
  }
};

export default ContentBlock;
