import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useTheme,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { handleLocationToCoords } from '../../api/geocode';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Button } from '../../components';

const businessTypes = [
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food and Beverage' },
  { id: 'health', label: 'Health and Wellness' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'retail', label: 'Retail' },
  { id: 'other', label: 'Other' },
];

function BusinessFilter({ isSearching, onSearch, selectedFilters, variant }) {
  const [location, setLocation] = useState(selectedFilters.location || '');
  const typeRef = useRef();
  const theme = useTheme();

  const typeToLabel = selectedFilters.type.replace(/-/g, ' ');

  const rbbWhite = theme.colors['rbb-white'];
  const rbbBlack = theme.colors['rbb-black-000'];
  const ctaButtonStyle = {
    backgroundColor: theme.colors['rbb-orange'],
    borderColor: '#C34D2B',
    textDecoration: 'none',
  };

  const variants = {
    onDark: {
      labelColors: [rbbBlack, rbbBlack, rbbWhite],
      buttonComponent: () => (
        <PrimaryButton
          onClick={handleSearchClick}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearchKeyPress(event);
            }
          }}
          isLoading={isSearching}
        >
          Search
        </PrimaryButton>
      ),
    },
    onLight: {
      labelColors: [rbbBlack, rbbBlack, rbbBlack],
      buttonComponent: () => (
        <Button
          style={ctaButtonStyle}
          fontSize="button"
          lineHeight="button"
          padding={theme.buttons.primary.padding}
          onClick={handleSearchClick}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearchKeyPress(event);
            }
          }}
          isLoading={isSearching}
        >
          Search
        </Button>
      ),
    },
  };

  const handleSearchClick = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      type: typeRef.current.value,
      location: location,
      coordinates,
    });
  };

  const handleSearchKeyPress = async event => {
    event.preventDefault();
    const coordinates = await handleLocationToCoords(location);
    onSearch({
      type: typeRef.current.value,
      location,
      coordinates,
    });
  };

  const selectedVariant = variants[variant];

  let SubmitButton = selectedVariant.buttonComponent;

  return (
    <FormControl
      bg={[rbbWhite, rbbWhite, 'rgba(0,0,0,0)']}
      maxWidth="1000px"
      padding={['24px', '24px', '0 24px']}
      fontFamily="Arvo"
    >
      <Flex
        width="100%"
        justifyContent="center"
        direction={['column', 'column', 'row', 'row']}
      >
        <Flex
          direction="column"
          marginRight={[0, 0, theme.spacing.base]}
          marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
        >
          <FormLabel htmlFor="type" color={selectedVariant.labelColors}>
            Business Type
          </FormLabel>
          <Select
            ref={typeRef}
            id="type"
            placeholder="All"
            defaultValue={typeToLabel}
          >
            {businessTypes.map(resource => {
              return (
                <option key={resource.id} value={resource.label}>
                  {resource.label}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex
          direction="column"
          marginRight={[0, 0, theme.spacing.base]}
          marginBottom={[theme.spacing.base, theme.spacing.base, 0]}
        >
          <FormLabel htmlFor="location" color={selectedVariant.labelColors}>
            Location
          </FormLabel>
          <Input
            value={location}
            id="location"
            type="text"
            placeholder="e.g. Atlanta or 30308"
            onChange={event => setLocation(event.currentTarget.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearchKeyPress(event);
              }
            }}
          />
        </Flex>
        <Flex
          direction="column"
          alignSelf={['center', 'center', 'flex-end']}
          pt={['1rem', '1rem', 0, 0]}
        >
          <SubmitButton />
        </Flex>
      </Flex>
    </FormControl>
  );
}

BusinessFilter.propTypes = {
  isSearching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['onLight', 'onDark']).isRequired,
};

BusinessFilter.defaultProps = {
  variant: 'onDark',
};

export default BusinessFilter;
