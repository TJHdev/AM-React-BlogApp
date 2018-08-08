import React from 'react';
import { connect } from 'react-redux';
import BlogForm from './BlogForm';
import { startEditBlog, startRemoveBlog } from '../actions/blogs';
import RemoveModal from './RemoveModal';

export class EditBlogPage extends React.Component {
  state = {
    confirmRemoveBlog: null
  };
  onSubmit = (blog) => {
    this.props.startEditBlog(this.props.blog.id, blog);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveBlog({ id: this.props.blog.id });
    this.props.history.push('/');
  };
  handleOpenRemoveModal = () => {
    this.setState(() => ({ confirmRemoveBlog: true }))
  };
  handleCloseRemoveModal = () => {
    this.setState(() => ({ confirmRemoveBlog: null }))
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit blog</h1>
          </div>
        </div>
        <div className="content-container">
          <BlogForm 
            blog={this.props.blog}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.handleOpenRemoveModal}>Remove Blog</button>
        </div>
        <RemoveModal
          confirmRemoveBlog={this.state.confirmRemoveBlog}
          handleCloseRemoveModal={this.handleCloseRemoveModal}
          onRemove={this.onRemove}
        />
      </div>
    )
  };
}

const mapStateToProps = (state, props) => { // can pass both state and props
  return {
    blog: state.blogs.find((blog) => {
      return blog.id === props.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch) => ({
  startEditBlog: (id, blog) => {
    return dispatch(startEditBlog(id, blog));
  },
  startRemoveBlog: (data) => {
    return dispatch(startRemoveBlog(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);