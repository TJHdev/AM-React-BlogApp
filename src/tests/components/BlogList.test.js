import React from 'react';
import { shallow } from 'enzyme';
import blogs from '../fixtures/blogs';
import { BlogList } from '../../components/BlogList';

test('should render BlogList with blogs', () => {
  const wrapper = shallow(<BlogList blogs={blogs} />)
  expect(wrapper).toMatchSnapshot();
});

test('should render BlogList with empty array', () => {
  const wrapper = shallow(<BlogList blogs={[]} />)
  expect(wrapper).toMatchSnapshot();
});