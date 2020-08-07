import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const SEO = ({
  title,
  description,
  image,
  canonicalUrl,
  children,
  ...rest
}) => {
  const { site } = useStaticQuery(
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
    `
  );

  const { siteMetadata: seo, social } = site;

  const pageTitle = title || seo?.title;
  const pageDescription = description || seo?.description;
  const pageImage = image || seo?.image;
  const url = seo?.siteUrl;

  return (
    <>
      <Helmet
        defaultTitle={seo?.title}
        titleTemplate={`%s - ${seo?.title}`}
        htmlAttributes={{ lang: 'en' }}
        title={pageTitle}
        {...rest}
      >
        {/* General tags */}
        <meta name="description" content={pageDescription} />
        <meta name="image" content={pageImage} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="fb:app_id" content={social?.fbAppID} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={social?.twitter} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <script
          src="https://cdn.usefathom.com/script.js"
          spa="auto"
          site={process.env.FATHOM_SITE_ID}
          defer
        />
        {children}
      </Helmet>
    </>
  );
};

SEO.propTypes = {
  canonicalUrl: PropTypes.string,
  children: PropTypes.node,
};

export default SEO;
