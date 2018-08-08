import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTextFilter, sortByDate, sortByTitle } from '../actions/filters';

export class BlogListFilters extends React.Component { // this allows us to add state
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
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
              placeholder={'Search expenses'} 
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="input-group__item">
            <Link className="button" to="/create">Add Blog</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByTitle: () => dispatch(sortByTitle()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(BlogListFilters);