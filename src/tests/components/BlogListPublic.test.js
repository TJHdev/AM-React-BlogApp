import React from 'react';
import { shallow } from 'enzyme';
import BlogListPublic from '../../components/BlogListPublic';
import blogs from '../fixtures/blogs';
import { Provider } from 'react-redux';


test('should render BlogListPublic with blogs', () => {
  const wrapper = shallow(
  <Provider>
    <BlogListPublic blogs={blogs}/>
  </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render BlogListPublic with blogs', () => {
  const wrapper = shallow(
  <Provider> 
    <BlogListPublic blogs={[]}/>
  </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});