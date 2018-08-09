import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import BlogForm from '../../components/BlogForm';
import blogs from '../fixtures/blogs';

test('should render BlogForm correctly', () => {
  const wrapper = shallow(<BlogForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render BlogForm correctly with blog data', () => {
  const wrapper = shallow(<BlogForm blog={blogs[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid submission', () => {
  const wrapper = shallow(<BlogForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').prop('onSubmit')({
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('Please provide title and body!');
  expect(wrapper).toMatchSnapshot();
});

test('should set title on input change', () => {
  const value = 'New title';
  const wrapper = shallow(<BlogForm />);
  wrapper.find('input').prop('onChange')({
    target: { value: value }
  });
  expect(wrapper.state('title')).toBe('New title');
});

test('should set body on input change', () => {
  const value = 'New body';
  const wrapper = shallow(<BlogForm />);
  wrapper.find('textarea').prop('onChange')({
    target: { value: value }
  });
  expect(wrapper.state('body')).toBe('New body');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<BlogForm blog={blogs[1]} onSubmit={onSubmitSpy}/>)
  wrapper.find('form').prop('onSubmit')({
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    title: blogs[1].title,
    body: blogs[1].body,
    createdAt: blogs[1].createdAt,
    lastEditedAt: moment().valueOf(),
  });
});