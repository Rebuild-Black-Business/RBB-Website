import React from "react";

import { Flex, Link, Heading } from "@chakra-ui/core";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { Link as GatsbyLink } from "gatsby";

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Link as={GatsbyLink} to="/about">
        About
      </Link>
      <Link as={GatsbyLink} to="/biz-in-need">
        Businesses In Need
      </Link>
      <Link as={GatsbyLink} to="/black-owned-biz">
        Black Owned Businesses
      </Link>
      <Link as={GatsbyLink} to="/supporting-orgs">
        Supporting Organizations
      </Link>
      <Link as={GatsbyLink} to="/allies">
        Allies
      </Link>
      <Flex align="center" justify="center">
        <Heading>Home</Heading>
      </Flex>
    </Layout>
  );
};
