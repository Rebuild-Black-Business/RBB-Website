import React from 'react';
import Head from 'next/head';
import config from '../../config';

export default function SEO({ description, title }) {
  const siteTitle = config.siteMetadata.title;
  const { url, image, social } = config.siteMetadata;

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>

      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      {/* <link rel="canonical" href={canonicalUrl} /> */}

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="fb:app_id" content={social?.fbAppID} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={social?.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
