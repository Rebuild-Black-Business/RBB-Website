// _______________________ LLEXICALS WORK ____________________ \\
// _______________________ LLEXICALS WORK ____________________ \\

// import React, { useState, useEffect } from 'react';
// import algoliasearch from 'algoliasearch/lite';

// import { graphql } from 'gatsby';
// import { Flex } from '@chakra-ui/core';
// import { PageHero, Layout, BusinessFeed, Pagination } from '../components';
// import CardSkeleton from '../components/Loading/CardSkeleton';

// const client = algoliasearch(
//   process.env.GATSBY_ALGOLIA_APP_ID,
//   process.env.GATSBY_ALGOLIA_SEARCH_KEY
// );
// const index = client.initIndex('businesses');

// const LOADING_STATE = {
//   NONE: 'none',
//   INITIAL: 'intial',
//   SEARCHING: 'searching',
// };

// function useAlgoliaSearch() {
//   const [results, setResults] = useState([]);
//   const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIAL);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalResults, setTotalResults] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     async function getBusinesses() {
//       try {
//         const algoliaResponse = await index.search('', {
//           page: currentPage,
//         });

//         setResults(algoliaResponse.hits);
//         setTotalPages(algoliaResponse.nbPages);
//         setTotalResults(algoliaResponse.nbHits);
//         setLoadingState(LOADING_STATE.NONE);
//       } catch (e) {
//         console.log('error searching', e);
//       }
//     }

//     getBusinesses();
//   }, [currentPage]);

//   return {
//     results,
//     totalPages,
//     totalResults,
//     currentPage,
//     loadingState,
//     setCurrentPage,
//   };
// }

// export default function Businesses({ location }) {
//   const {
//     currentPage,
//     loadingState,
//     results,
//     totalPages,
//     totalResults,
//     setPage,
//     goToPage,
//     setCurrentPage,
//   } = useAlgoliaSearch();

//   useEffect(() => {
//     // Not the best, would normally use defined params, but will do.
//     const pageNum = location.pathname.split('/').pop();

//     setCurrentPage(pageNum);
//   }, [location, setCurrentPage]);

//   const pageSubtitle = (
//     <p>
//       These business owners have been impacted during the protests. Your support
//       will assist their rebuilding efforts. If you are a business owner in need,
//       please <a href="#temp">sign up to be added to our list</a>
//     </p>
//   );

//   const heroBackgroundImageUrl =
//     'http://res.cloudinary.com/rebuild-black-business/image/upload/f_auto/v1/assets/business-header';

//   return (
//     <Layout>
//       <Flex align="center" justify="center" direction="column">
//         <PageHero
//           title="Businesses"
//           subtitle={pageSubtitle}
//           heroImageUrl={heroBackgroundImageUrl}
//           hasFadedHeroImage
//         />

//         <CardSkeleton data={results}>
//           <BusinessFeed businesses={results} />
//         </CardSkeleton>

//         <Pagination
//           currentPage={currentPage}
//           totalRecords={totalResults}
//           pageLimit={20}
//         />
//       </Flex>
//     </Layout>
//   );
// }

// export const query = graphql`
//   query($itemsPerPage: Int!, $skip: Int!) {
//     allAirtableBusinesses(limit: $itemsPerPage, skip: $skip) {
//       nodes {
//         data {
//           Email
//           Name
//           Business_Name
//           Category
//           Zip_Code
//           Business_Description
//           Website
//           Donation_Link
//           In_Need
//           CreatedAt
//         }
//       }
//     }
//   }
// `;
// _______________________ LLEXICALS WORK ____________________ \\
// _______________________ LLEXICALS WORK ____________________ \\

// _______________________ MAGNIFICODES WORK ____________________ \\
// _______________________ MAGNIFICODES WORK ____________________ \\

import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import { Flex, Input, FormControl, useTheme, FormLabel } from '@chakra-ui/core';
import { PageHero, Layout, BusinessFeed } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  RefinementList,
  MenuSelect,
  PoweredBy,
} from 'react-instantsearch-dom';
import PrimaryButton from '../components/Buttons/PrimaryButton';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

export default function Businesses() {
  const theme = useTheme();
  const pageSubtitle = (
    <p>
      These business owners have been impacted during the protests. Your support
      will assist their rebuilding efforts. If you are a business owner in need,
      please <a href="#temp">sign up to be added to our list</a>
    </p>
  );

  const heroBackgroundImageUrl =
    'http://res.cloudinary.com/rebuild-black-business/image/upload/f_auto/v1/assets/business-header';

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Businesses"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />

        <InstantSearch indexName={'businesses'} searchClient={searchClient}>
          <FormControl maxWidth="1000px" margin="0 auto 3rem" padding="0 24px">
            <Flex width="100%" justifyContent="space-between">
              <Flex direction="column">
                <FormLabel htmlFor="need" color={theme.colors['rbb-white']}>
                  Black Businesses
                </FormLabel>
                <MenuSelect
                  id="need"
                  attribute="in_need"
                  transformItems={items =>
                    items.map(item => ({
                      ...item,
                      label: 'item.label.toUpperCase()',
                    }))
                  }
                  translations={{
                    seeAllOption: 'All Businesses',
                  }}
                />
              </Flex>
              <Flex direction="column">
                <FormLabel htmlFor="type" color={theme.colors['rbb-white']}>
                  Zip Code
                </FormLabel>
                {/* <SearchBox submit={<PrimaryButton>Search</PrimaryButton>} /> */}
              </Flex>
              <Flex direction="column">
                <FormLabel htmlFor="type" color={theme.colors['rbb-white']}>
                  Business Type
                </FormLabel>
                <MenuSelect
                  id="type"
                  attribute="category"
                  transformItems={items =>
                    items.map(item => ({
                      ...item,
                      label: item.label.toUpperCase(),
                    }))
                  }
                  translations={{
                    seeAllOption: 'All Categories',
                  }}
                />
              </Flex>
            </Flex>
          </FormControl>
          {/* <CardSkeleton data={results}> */}
          {/* <BusinessFeed businesses={results} /> */}
          <Hits />
          <Pagination />
          <PoweredBy />
          {/* </CardSkeleton> */}
        </InstantSearch>

        {/* <Pagination
          currentPage={currentPage}
          totalRecords={totalResults}
          pageLimit={20}
        /> */}
      </Flex>
    </Layout>
  );
}

// _______________________ MAGNIFICODES WORK ____________________ \\
// _______________________ MAGNIFICODES WORK ____________________ \\
