import { shallow } from 'enzyme';
import HomePage from '../../components/HomePage';
import blogs from '../fixtures/blogs';

test('should render HomePage correctly', () => {
  const wrapper = shallow(<HomePage />);
  expect(wrapper).toMatchSnapshot();
});