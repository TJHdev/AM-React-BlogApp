import React from 'react';
import BlogListFilters from './BlogListFilters';
import BlogList from './BlogList';

const DashboardPage = () => (
  <div>
    <BlogListFilters />
    <BlogList />
  </div>
);

export default DashboardPage;