import React from 'react';
import { shallow } from 'enzyme';
import BlogListItemPublic from '../../components/BlogListItemPublic';
import blogs from '../fixtures/blogs';

test('should render public Blog list item correctly', () => {
  const wrapper = shallow(<BlogListItemPublic {...blogs[0]} />);
  expect(wrapper).toMatchSnapshot();
});