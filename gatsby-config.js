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
      name: 'Rebuild Black Business',
    },
    organization: {
      name: 'Rebuild Black Business',
      url: BASE_SITE_URL,
      logo: '#',
    },
    social: {
      twitter: '',
      fbAppID: '',
      instagram: '',
      github: 'https://github.com/Rebuild-Black-Business',
    },
    logo: {
      src: '#',
      alt: 'Rebuild Black Business',
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
        name: 'Businesses',
        slug: '/businesses',
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
        isResettingCSS: true,
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
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.FACEBOOK_PIXEL_ID,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'staging'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
  ],
};
