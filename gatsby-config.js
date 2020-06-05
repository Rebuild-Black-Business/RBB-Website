const BASE_SITE_URL = 'https://www.rebuildblackbusiness.com';

require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Rebuild Black Business`,
    // eslint-disable-next-line max-len
    description: ``,
    author: {
      name: '',
    },
    organization: {
      name: '',
      url: '',
      logo: '',
    },
    social: {
      twitter: '',
      fbAppID: '',
      instagram: '',
      github: '',
    },
    logo: {
      src: '',
      alt: '',
    },
    image: `${BASE_SITE_URL}/icons/icon-512x512.png`, // used for RSS feed image and SEO fallback
    logoText: 'Rebuild Black Business',
    siteUrl: BASE_SITE_URL,
    menuLinks: [
      {
        name: 'About',
        slug: '/about',
      },
      {
        name: 'Businesses In Need',
        slug: '/businesses-in-need',
      },
      {
        name: 'Black Owned Businesses',
        slug: '/black-owned-businesses',
      },
      {
        name: 'Resources',
        slug: '/resources',
      },
      {
        name: 'Allies',
        slug: '/allies',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // pulls in from your .env file
        tables: [
          {
            baseId: `appFoFzjMcciPUgoK`, // note that this is not a secret, just an id
            tableName: `Businesses In Need`,
            tableView: `Approved`, // optional
            queryName: `BizInNeed`,
            separateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: `appFoFzjMcciPUgoK`, // note that this is not a secret, just an id
            tableName: `Black Owned Businesses`,
            tableView: `Approved`, // optional
            queryName: `BlackOwnedBiz`,
            separateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: `appFoFzjMcciPUgoK`, // note that this is not a secret, just an id
            tableName: `Supporting Organizations`,
            tableView: `Approved`, // optional
            queryName: `SupportOrgs`,
            separateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: `appFoFzjMcciPUgoK`, // note that this is not a secret, just an id
            tableName: `Allies`,
            tableView: `Approved`, // optional
            queryName: `Allies`,
            separateNodeType: true,
            separateMapType: true,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        isUsingColorMode: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID, // pulls in from your .env file

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};
