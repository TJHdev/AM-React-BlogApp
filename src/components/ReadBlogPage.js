import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class ReadBlogPage extends React.Component {

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container--read">
            <h1 className="page-header__title">{this.props.blog.title}</h1>
            <p>Submitted on {moment(this.props.blog.createdAt).format('MMM Do, YYYY')}</p>
          </div>
        </div>
        <div className="content-container">
          <p>{this.props.blog.body}</p>
        </div>

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



export default connect(mapStateToProps)(ReadBlogPage);