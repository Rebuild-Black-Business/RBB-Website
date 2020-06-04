const BASE_SITE_URL = 'https://www.rebuildblackbusiness.com';

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
  },
  plugins: [
    {
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        isUsingColorMode: false
      }
    },
    "gatsby-plugin-react-helmet"
  ],
};