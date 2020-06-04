require("dotenv").config({
  path: `.env`,
});

module.exports = {
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
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        isUsingColorMode: false,
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
