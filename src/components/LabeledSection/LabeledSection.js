import React from 'react';
import PropTypes from 'prop-types';

import { Heading, Box, Grid, useTheme } from '@chakra-ui/core';

const LabeledSection = ({ label, children }) => {
  const theme = useTheme();

  return (
    <Grid
      gridTemplateColumns={'1fr 2fr'}
      gridGap="0px"
      width="100%"
      marginBottom={theme.spacing.med}
    >
      <Heading
        as="h2"
        paddingRight={theme.spacing.med}
        borderRightColor={theme.colors.red[500]}
        borderRightWidth="1px"
        marginRight={theme.spacing.med}
        lineHeight="normal"
        textTransform="uppercase"
        fontFamily={theme.fonts['heading-slab']}
        fontWeight={900}
        textAlign="right"
        height="100%"
      >
        {label}
      </Heading>
      <Box>{children}</Box>
    </Grid>
  );
};

LabeledSection.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default LabeledSection;
