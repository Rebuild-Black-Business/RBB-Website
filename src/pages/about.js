import React from 'react';

import { Link, Heading } from '@chakra-ui/core'
import Layout from "../components/Layout";
import { Link as GatsbyLink } from 'gatsby';

export default function About() {
  return (
    <Layout>
      <Link as={GatsbyLink} to="/">Home</Link>
      <Heading>About</Heading>
    </Layout>
  )
}