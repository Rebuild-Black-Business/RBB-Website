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

// _______________________ Attempt to use gatsby-algolia plugin with react-instantsearch-dom ____________________ \\
// _______________________ Attempt to use gatsby-algolia plugin with react-instantsearch-dom ____________________ \\

import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import {
  Flex,
  Input,
  FormControl,
  useTheme,
  FormLabel,
  SimpleGrid,
  Box,
} from '@chakra-ui/core';
import { PageHero, Layout, BusinessFeed } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  RefinementList,
  MenuSelect,
  connectHits,
  PoweredBy,
  Highlight,
} from 'react-instantsearch-dom';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import NoResultsCard from '../components/Cards/NoResultsCard';
import ResultCard from '../components/ResultCard';

const Hits = connectHits(({ hits }) => {
  const theme = useTheme();

  return (
    <div css={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* Always use a ternary when coercing an array length */}
      {/* otherwise you might print out "0" to your UI */}
      {hits.length ? (
        <Box
          w="100%"
          maxW={theme.containers.main}
          paddingX={[null, theme.spacing.base, theme.spacing.lg]}
        >
          <SimpleGrid columns={[null, 1, 2]} spacing={10}>
            {hits.map(hit => {
              return (
                <ResultCard
                  key={hit.objectID}
                  name={hit.business_name}
                  imageSrc={hit.image}
                  category={hit.category}
                  description={hit.description}
                  // location={business.data.Zip_Code}
                  websiteUrl={hit.website}
                />
              );
            })}
          </SimpleGrid>
        </Box>
      ) : (
        <NoResultsCard type="businesses" />
      )}
    </div>
  );
});

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
                <SearchBox />
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

// _______________________ Attempt to use gatsby-algolia plugin with react-instantsearch-dom ____________________ \\
// _______________________ Attempt to use gatsby-algolia plugin with react-instantsearch-dom ____________________ \\
