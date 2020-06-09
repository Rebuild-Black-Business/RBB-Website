const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const businesses = path.resolve(`src/templates/businesses.js`);

  const result = await graphql(
    `
      {
        allAirtableBusinesses {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );

  const itemsPerPage = 20;
  const totalRecords = result.data.allAirtableBusinesses.edges.length;
  const numberOfBusinessPages = Math.ceil(totalRecords / itemsPerPage);

  for (let pageNumber = 1; pageNumber <= numberOfBusinessPages; pageNumber++) {
    createPage({
      path: `businesses/${pageNumber === 1 ? '' : `${pageNumber}/`}`, // required, we don't have frontmatter for this page hence separate if()
      component: businesses,
      context: {
        page: pageNumber,
        itemsPerPage,
        totalRecords,
        skip: itemsPerPage * (pageNumber - 1),
      },
    });
  }
  return;
};

// Deletes the resource page for now.
exports.onCreatePage = async ({ page, actions: { deletePage } }) => {
  if (page.path.match(/^\/resources/)) {
    deletePage(page);
  }
};
