
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import { startEditBlog } from '../../actions/blogs';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid: uid }};


test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

// should call startLogout on button click
test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header isAuthenticated={true} startLogout={startLogout} />);
  wrapper.find('button').prop('onClick')();
  // wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalledTimes(1);
});


// LoginPage test file -> Should call startLogin on button click