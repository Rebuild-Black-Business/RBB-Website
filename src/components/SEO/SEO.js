import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const SEO = ({ postData, frontmatter = {}, postImage, isBlogPost }) => {
  const site = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            author {
              name
            }
            organization {
              name
              url
              logo
            }
            social {
              twitter
              fbAppID
            }
          }
        }
      }
    `,
  );

  const { siteMetadata: seo } = site;

  const postMeta =
    frontmatter || postData.childMarkdownRemark.frontmatter || {};

  const title = postMeta?.title || seo?.title;
  const description = postMeta?.description || seo?.description;
  const image = postImage ? `${seo.siteUrl}${postImage}` : seo?.image;
  const url = postMeta.slug ? `${seo.siteUrl}/${postMeta.slug}/` : seo?.siteUrl;
  
  
  // const datePublished = isBlogPost ? postMeta.datePublished : false;

  return (
    <React.Fragment>
      <Helmet
        defaultTitle={seo.title}
        titleTemplate={`%s - ${seo.title}`}
      >
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        {isBlogPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="fb:app_id" content={seo?.social?.fbAppID} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={seo?.social?.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script src="https://cdn.usefathom.com/script.js" spa="auto" site={process.env.FATHOM_SITE_ID} defer/>
      </Helmet>
    </React.Fragment>
  );
};

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  postImage: PropTypes.string,
};

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null,
};

export default SEO;
