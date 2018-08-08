import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const now = moment();

export default class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { // no way to do add/edit conditional without constructor
      title: props.blog ? props.blog.title : '',
      body: props.blog ? props.blog.body :  '',
      createdAt: props.blog ? moment(props.blog.createdAt) :  moment(),
      lastEditedAt: props.blog ? moment(props.blog.lastEditedAt) :  moment(),
      calendarFocused: false,
      error: ''
    };
  };
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
    // // alternetive implementation
    // e.persist();
    // this.setState(() => ({ e.target.value }));
  };
  onDateChange = (createdAt) => {
    if (createdAt) { // prevents the user from clearing this value
      this.setState(() => ({ createdAt }));
    }
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title || !this.state.body) {
      this.setState(() => ({ error: 'Please provide title and body!' }))
    } else {
      this.setState(() => ({ error: '' })) 
      this.props.onSubmit({
        title: this.state.title,
        body: this.state.body,
        createdAt: this.state.createdAt.valueOf(),
        lastEditedAt: moment().valueOf()
      }) // we pass the data up so that the form can remain re-usable
    }
  };
  render() {
    return (
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Title"
            className="text-input"
            autoFocus
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <textarea
            placeholder="Add the text body"
            className="textarea"
            value={this.state.body}
            onChange={this.onBodyChange}
          ></textarea>
          <div>
            <button className="button">Save Blog</button>
          </div>
        </form>
    );
  }
}