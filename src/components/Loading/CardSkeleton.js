import React from 'react';
import { Skeleton, useTheme } from '@chakra-ui/core';

/**
 * Wraps content that parses data with a placeholder skeleton
 */
const CardSkeleton = ({ children, data }) => {
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();

  React.useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data]);

  return (
    <Skeleton
      isLoaded={!loading}
      colorStart={theme.colors['rbb-result-card-grey']}
      colorEnd={theme.colors['rbb-result-card-grey']}
    >
      {children}
    </Skeleton>
  );
};

export default CardSkeleton;
