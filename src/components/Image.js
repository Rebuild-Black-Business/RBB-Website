import React from 'react';
import { useImage } from 'use-cloudinary';

// Now we can pass Cloudinary options & easily apply Chakra style props to our image
import { Image as ChakraImage } from '@chakra-ui/core';

export default function Image(props) {
  const { cloudName, transforms, publicId } = props;

  const { getImage, data, status, error } = useImage({ cloud_name: cloudName })

  React.useEffect(() => {
    getImage({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
  }, [])


  // Can make use of the `Spinner` or `Skeleton` component from Chakra UI here 
  if (status === "loading") return <p>Loading...</p>;

  // Deliver Custom Error UI as well 
  if (status === "error") return <p>{error.message}</p>;

  return <ChakraImage {...props} src={data} alt="Media from Cloudinary" />
}