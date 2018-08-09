import React from 'react';
import { shallow } from 'enzyme';
import { EditBlogPage } from '../../components/EditBlogPage';
import blogs from '../fixtures/blogs';

let startEditBlog, handleOpenRemoveModal, history, wrapper;

beforeEach(() => {
  startEditBlog = jest.fn();
  handleOpenRemoveModal = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditBlogPage 
      blog={blogs[1]}
      handleOpenRemoveModal={handleOpenRemoveModal}
      startEditBlog={startEditBlog}
      history={history}
    />
  );
});

test('should render EditBlogPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditBlog', () => {
  wrapper.find('BlogForm').prop('onSubmit')(blogs[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditBlog).toHaveBeenLastCalledWith(blogs[1].id, blogs[1]);
});

test('should open the remove modal through change of state', () => {
  expect(wrapper.state('confirmRemoveBlog')).toBe(null);
  wrapper.find('button').prop('onClick')();
  expect(wrapper.state('confirmRemoveBlog')).toBe(true);
});