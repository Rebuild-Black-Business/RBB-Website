const { getSlugForBusiness } = require('./src/utils/business');

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

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      businesses: allAirtableBusinesses {
        nodes {
          data {
            Business_Name
            Name
          }
          recordId
        }
      }
    }
  `);

  result.data.businesses.nodes.forEach(business => {
    const slug = getSlugForBusiness({
      businessName: business.data.Business_Name,
      name: business.data.Name,
      airtableId: business.recordId,
    });

    if (slug) {
      actions.createPage({
        path: `/business/${slug}`,
        component: require.resolve('./src/templates/singleBusinessPage'),
        context: {
          businessId: business.recordId,
        },
      });
    }
  });
};
