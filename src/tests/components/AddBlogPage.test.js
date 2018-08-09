import React from 'react';
import { shallow } from 'enzyme';
import { AddBlogPage } from '../../components/AddBlogPage';
import expenses from '../fixtures/blogs';

let startAddBlog, history, wrapper;

beforeEach(() => {
  startAddBlog = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddBlogPage startAddBlog={startAddBlog} history={history} />);
});

test('should render AddBlogPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('BlogForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startAddBlog).toHaveBeenLastCalledWith(expenses[1]);
});