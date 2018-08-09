import React from 'react';
import { shallow } from 'enzyme';
import blogs from '../fixtures/blogs';
import BlogListItem from '../../components/BlogListItem';

test('renders blog list item correctly', () => {
  const wrapper = shallow(<BlogListItem {...blogs[2]} />);
  expect(wrapper).toMatchSnapshot();
});