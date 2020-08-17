import React, { useRef } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useTheme,
} from '@chakra-ui/core';

import PrimaryButton from '../Buttons/PrimaryButton';

function FundraiserFilter(props) {
  const { onSearch } = props;
  const nameRef = useRef('');
  const theme = useTheme();

  const rbbWhite = theme.colors['rbb-white'];
  const rbbBlack = theme.colors['rbb-black-000'];

  const handleSearchClick = event => {
    event.preventDefault();
    onSearch({
      name: nameRef.current.value,
    });
  };

  const handleSearchKeyPress = event => {
    event.preventDefault();
    onSearch({
      name: nameRef.current.value,
    });
  };

  return (
    <Box
      w="100%"
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
    >
      <FormControl
        bg={[rbbWhite, rbbWhite, 'rgba(0,0,0,0)']}
        width="100%"
        maxWidth="1000px"
        margin="0 auto 3rem"
        padding={['24px', '24px', '0 24px']}
        fontFamily="Arvo"
      >
        <Flex
          width="100%"
          direction={['column', 'column', 'row', 'row']}
          justify="center"
        >
          <Flex
            direction="column"
            marginRight={[0, 0, theme.spacing.base]}
            marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
          >
            <FormLabel htmlFor="name" color={[rbbBlack, rbbBlack, rbbWhite]}>
              Name
            </FormLabel>
            <Input
              ref={nameRef}
              id="name"
              placeholder=" e.g. Rebuild the Block "
            />
          </Flex>
          <Flex
            direction="column"
            alignSelf={['center', 'center', 'flex-end']}
            pt={['1rem', '1rem', 0, 0]}
          >
            <PrimaryButton
              onClick={handleSearchClick}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleSearchKeyPress(event);
                }
              }}
            >
              Search
            </PrimaryButton>
          </Flex>
        </Flex>
      </FormControl>
    </Box>
  );
}

export default FundraiserFilter;
