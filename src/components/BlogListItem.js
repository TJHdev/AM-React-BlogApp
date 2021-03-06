import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BlogListItem = ({ id, title, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <h3 className="list-item__title">{title}</h3>
    <span className="list-item__subtitle">{moment(createdAt).format('h:mma, MMMM Do, YYYY')}</span>
  </Link>
);

export default BlogListItem;