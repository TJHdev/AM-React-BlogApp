import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTextFilter, sortByDateCreated, sortByDateEdited, sortByTitle } from '../actions/filters';

export class BlogListFilters extends React.Component { // this allows us to add state
  state = {
    calendarFocused: null
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'dateCreated') {
      this.props.sortByDateCreated();
    } else if (e.target.value === 'dateEdited') {
      this.props.sortByDateEdited();
    } else if (e.target.value === 'title') {
      this.props.sortByTitle();
    }
  }
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input 
              className="text-input"
              type="text"
              autoFocus
              defaultValue={this.props.filters.text}
              onChange={this.onTextChange}
              placeholder={'Search blogs'} 
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="dateCreated">Date Created</option>
              <option value="dateEdited">Date Last Edited</option>
              <option value="title">Title</option>
            </select>
          </div>
          { this.props.isAuthenticated && 
            <div className="input-group__item">
              <Link className="button" to="/create">Add Blog</Link>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    isAuthenticated: Boolean(state.auth.uid)
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDateCreated: () => dispatch(sortByDateCreated()),
    sortByDateEdited: () => dispatch(sortByDateEdited()),
    sortByTitle: () => dispatch(sortByTitle()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(BlogListFilters);