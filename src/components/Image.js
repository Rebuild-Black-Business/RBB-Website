import React from 'react';
import { useImage } from 'use-cloudinary';
import { Image as ChakraImage } from '@chakra-ui/core';

export default function Image(props) {
  const { transforms, publicId, alt, src } = props;

  const { getImage, data, status, error } = useImage({
    cloud_name: 'rebuild-black-business',
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    getImage({
      public_id: publicId,
      transform_options: {
        ...transforms,
      },
    });
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */

  // @TODO :: Use`Spinner` or`Skeleton` component from Chakra UI here
  if (status === 'loading') return <p>Loading...</p>;

  // @TODO :: Deliver custom Error UI if needed
  if (status === 'error') return <p>{error.message}</p>;

  return <ChakraImage {...props} src={data || src} alt={alt} />;
}
