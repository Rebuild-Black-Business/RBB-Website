import React from 'react';

import { Flex, Text } from '@chakra-ui/core';

import { AllyFeed, PageHero, Layout, Pagination } from '../components';

export default function Allies() {
  const pageSubtitle = (
    <Text paddingBottom="59px">
      These Allies have skills to share in assisting black-owned businesses to
      return to business, and stay afloat while operating. Reach out to those on
      this page if you know of a way to join the fight in helping businesses
      survive and thrive.
    </Text>
  );

  const heroBackgroundImageUrl =
    'http://res.cloudinary.com/rebuild-black-business/image/upload/f_auto/v1/assets/ally-background';

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Allies"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />
        <AllyFeed />
        <Pagination
          onPageChanged={pagination => {
            // @TODO add pagination handler
          }}
          totalRecords={70}
          pageLimit={5}
        />
      </Flex>
    </Layout>
  );
}
