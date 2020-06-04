import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { Flex, Link, Heading } from "@chakra-ui/core";
import { Link as GatsbyLink } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

const BlackOwnedBiz = (data) => {
  return (
    <Layout>
      <Helmet>
        <title>Black Owned Biz</title>
      </Helmet>
      <Link as={GatsbyLink} to="/">
        Home
      </Link>
      <Flex align="center" justify="center">
        <Heading>Black Owned Biz</Heading>
      </Flex>
      <div>{JSON.stringify(data, null, 2)}</div>
    </Layout>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableBlackOwnedBiz {
          nodes {
            data {
              Business_Name
              Category
              CreatedAt
              Email
              ID
              Location__Zip_Code_
              Name
              Website
            }
          }
        }
      }
    `}
    render={(data) => <BlackOwnedBiz data={data} {...props} />}
  />
);
