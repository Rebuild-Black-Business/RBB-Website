exports.onCreateWebpackConfig = ({ plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ALGOLIA_APPLICATION_ID: JSON.stringify(
          process.env.ALGOLIA_APPLICATION_ID
        ),
        ALGOLIA_API_KEY: JSON.stringify(process.env.ALGOLIA_API_KEY),
        ALGOLIA_INDEX: JSON.stringify(process.env.ALGOLIA_INDEX),
      }),
    ],
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Only update the `/app` page.
  if (page.path.match(/^\/businesses/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/businesses/*';
    // Update the page.
    createPage(page);
  }
};
