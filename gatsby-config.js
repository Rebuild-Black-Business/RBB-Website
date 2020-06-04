module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        isUsingColorMode: false
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify"
  ],
};