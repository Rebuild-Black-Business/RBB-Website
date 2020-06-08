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
        name: 'Home',
        slug: '/',
      },
      {
        name: 'About',
        slug: '/about',
      },
      {
        name: 'Businesses',
        slug: '/businesses',
      },
      {
        name: 'Allies',
        slug: '/allies',
      },
    ],
    photoCreditLinks: [
      {
        photographer: 'John Cameron',
        url: 'https://unsplash.com/@john_cameron',
        pagePathname: '/',
      },
      {
        photographer: 'Kelly Lacy',
        url: 'https://instagram.com/kellymlacy',
        pagePathname: '/',
      },
      {
        photographer: 'Mike Von',
        url: 'https://thevoncomplex.com',
        pagePathname: '/',
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
            baseId: process.env.AIRTABLE_BASE_ID, // note that this is not a secret, just an id
            tableName: `Businesses`,
            tableView: `Approved`, // optional
            queryName: `Businesses`,
            separateNodeType: true,
            separateMapType: true,
            defaultValues: {
              Business_Description: '',
              Donation_Link: '',
            },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID, // note that this is not a secret, just an id
            tableName: `Resources`,
            tableView: `Approved`, // optional
            queryName: `Resources`,
            separateNodeType: true,
            separateMapType: true,
            defaultValues: {
              Description: '',
              Zip_Code: '',
            },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID, // note that this is not a secret, just an id
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
