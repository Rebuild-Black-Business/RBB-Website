import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import Businesses from '../templates/businesses';

const BusinessesRouter = () => (
  <Layout>
    <Router>
      <Businesses path="/businesses" />
      <Businesses path="/businesses/:category" />
      <Businesses path="/businesses/all" />
      <Businesses path="/businesses/all/:category" />
    </Router>
  </Layout>
);

export default BusinessesRouter;
