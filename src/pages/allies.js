import React, { useState } from 'react';

import { Flex } from '@chakra-ui/core';

import {
  AllyFeed,
  AllyFilter,
  PageHero,
  Layout,
  Pagination,
} from '../components';

export default function Allies() {
  const [allyFilters, setAllyFilters] = useState({
    skill: '',
    location: '',
  });

  const pageSubtitle = (
    <p>
      These Allies have skills to share in assisting black-owned businesses to
      return to business, and stay afloat while operating. Reach out to those on
      this page if you know of a way to join the fight in helping businesses
      survive and thrive.
    </p>
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
        <AllyFilter onSearch={setAllyFilters} />
        <AllyFeed filters={allyFilters} />
        <Pagination totalRecords={70} pageLimit={5} />
      </Flex>
    </Layout>
  );
}
