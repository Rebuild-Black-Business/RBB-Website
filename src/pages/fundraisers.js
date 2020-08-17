import React, { useState } from 'react';
import { Flex, Text, useTheme } from '@chakra-ui/core';
import { Image, Layout, PageHero } from '../components';
import { FundraiserFeed, FundraiserFilter } from '../components';

export default function Fundraisers() {
  const [fundraiserFilters, setFundraiserFilters] = useState({
    name: '',
  });
  const theme = useTheme();

  const pageSubtitle = (
    <Text
      fontFamily={theme.fonts.heading}
      lineHeight="1.25"
      pb={theme.spacing.base}
      textAlign="center"
    >
      We continuously collect fundraisers that are for specific Black-owned
      businesses or are put together to aid in rebuilding Black-owned
      businesses. Show your support for our Black communities across the nation
      by opening your wallets and donating!
    </Text>
  );

  const heroBackgroundImageUrl =
    '//res.cloudinary.com/rebuild-black-business/image/upload/c_scale,f_auto,h_0.6,q_auto/v1/assets/ally-background';

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Fundraisers"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />
        <FundraiserFilter onSearch={setFundraiserFilters} />
        <FundraiserFeed filters={fundraiserFilters} />
      </Flex>
    </Layout>
  );
}
