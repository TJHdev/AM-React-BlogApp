import React from 'react';
import { connect } from 'react-redux';
import BlogListItemPublic from './BlogListItemPublic';
import selectBlogs from '../selectors/blogs';

export const BlogListPublic = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Blogs</div>
      <div className="show-for-desktop">Blog</div>
      <div className="show-for-desktop">Date Created</div>
    </div>
    <div className="list-body">
      {
        props.blogs.length === 0 ? (
          <div className="list-item list-item--message">
            <span>There are no blogs</span>
          </div>
        ) : (
          props.blogs.map((blog) => (
            <BlogListItemPublic key={blog.id} {...blog} />
          ))
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    blogs: selectBlogs(state.blogs, state.filters)
  };
};

export default connect(mapStateToProps)(BlogListPublic);
