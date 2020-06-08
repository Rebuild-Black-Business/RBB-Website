import { Divider, Flex, Heading, Text, theme } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @component
 * @example
 * return (
 *   <Content
 *     heading="MISSION"
 *     message="Our mission statement..."
 *     marginTop="25px"
 *     marginBottom="25px
 *     dividerMargin="10px"
 *   />
 * )
 */
const Content = ({
  heading,
  message,
  marginTop,
  marginBottom,
  dividerMargin,
}) => {
  return (
    <Flex
      direction={['column', 'column', 'column', 'row', 'row']}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <Heading
        as="h2"
        lineHeight="1"
        verticalAlign="top"
        fontFamily={theme.fonts['heading-slab']}
        color={theme.colors['rbb-black-200']}
        textAlign={['center', 'center', 'center', 'right']}
        minW="285px"
        paddingRight={['0', '0', '22px']}
      >
        {heading}
      </Heading>
      <Divider
        marginLeft={[dividerMargin, dividerMargin, '3px', '3px']}
        marginRight={[dividerMargin, dividerMargin, '28px', '28px']}
        marginTop={['25px', '25px', '25px', '0']}
        marginBottom={['25px', '25px', '25px', '0']}
        border="1px solid"
        borderColor="#BA2A2A"
        orientation="vertical"
      />
      <Text
        style={{ whiteSpace: 'pre-wrap' }}
        textAlign={['center', 'center', 'center', 'left']}
        paddingLeft={['0px', '0px', '25px', '25px']}
        marginLeft={['24px', '24px', '0']}
        marginRight={['24px', '24px', '0']}
      >
        {message}
      </Text>
    </Flex>
  );
};


Content.propTypes = {
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  dividerMargin: PropTypes.string,
};
export default Content;
