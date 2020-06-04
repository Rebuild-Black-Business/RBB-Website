
// this will probably be www.rebuildblackbusiness.com
const BASE_SITE_URL = process.env.BASE_SITE_URL;

module.exports = {
  siteMetadata: {
    title: `Rebuild Black Business`,
    // eslint-disable-next-line max-len
    description: ``,
    author: ``,
    organization: {
      name: '',
      url: '',
      logo: '',
    },
    social: {
      twitter: ''
      fbAppID: '',
      instagram: '',
      github: '',
    },
    logo: {
      src: '',
      alt: '',
    },
    image_url: `${BASE_SITE_URL}/icons/icon-512x512.png`, // used for RSS feed image
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