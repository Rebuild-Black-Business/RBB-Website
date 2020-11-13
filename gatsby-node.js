// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Only update the `/businesses` page.
  if (page.path.match(/^\/businesses/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/businesses/*';
    // Update the page.
    createPage(page);
  }
};

exports.createPages = ({ actions }) => {
  actions.createPage({
    path: `/business`,
    matchPath: `/business/:id`,
    component: require.resolve('./src/templates/singleBusinessPage'),
  });
};

// switch off type inference for SitePage.context
// more info here - https://www.gatsbyjs.com/docs/scaling-issues/#switch-off-type-inference-for-sitepagecontext
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }
  `);
};
