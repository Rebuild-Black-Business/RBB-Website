import React from 'react';
import Image from './Image';
import { Flex, Grid, Button } from '@chakra-ui/core';
import { useSearch } from 'use-cloudinary';

// This serves as strictly an example usecase for search to work.

export default function Search() {
  const { search, data, status } = useSearch({
    endpoint: '/.netlify/functions/search',
  });

  // Again we can place Skeleton or Spinner components 👍
  if (status === 'loading') return <p>Loading...</p>;

  // Below we're using a button to search and return any resource of image

  /* 
    ❗ We can also do things like stuff it into a useEffect and search with more explicit search terms (check out the useSearch hook in the docs)❗

    React.useEffect(() => {
      search({
        expression: "resource_type:image AND tags=black_businesses" <-- now we can return a logo listing super easily by tags
      })
    })

  */

  return (
    <Flex
      margin="16px"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button
        onClick={() =>
          search({
            expression: 'resource_type:image',
          })
        }
      >
        Load
      </Button>
      <Grid templateColumns="repeat(4, 1fr)">
        {data &&
          data.resources.map(image => (
            <Image
              cloudName="rebuild-black-business"
              border="2px solid black"
              publicId={image.public_id}
              options={{ height: 0.2 }}
            />
          ))}
      </Grid>
    </Flex>
  );
}
