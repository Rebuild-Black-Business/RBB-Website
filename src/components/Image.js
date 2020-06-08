import React from 'react';
import { useImage } from 'use-cloudinary';
import { Image as ChakraImage } from '@chakra-ui/core';

export default function Image(props) {
  const { cloudName, transforms, publicId, alt } = props;

  const { getImage, data, status, error } = useImage({ cloud_name: cloudName });

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

  return <ChakraImage {...props} src={data} alt={alt} />;
}

/*
  Image Component in use

  <Image
    cloudName="rebuild-black-business"
    publicId="samples/animals/three-dogs"
    mt={10}
    transforms={{
      height: 0.3,
      fetchFormat: 'auto',
      quality: 'auto',
    }}
  />
*/
