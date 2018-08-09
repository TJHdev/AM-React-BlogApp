import getVisibleBlogs from '../../selectors/blogs';
import blogs from '../fixtures/blogs';

test('should filter by text value', () => {
  const filters = {
    text: 'is',
    sortBy: 'dateCreated'
  };
  const result = getVisibleBlogs(blogs, filters);
  expect(result).toEqual([blogs[1], blogs[2]]);
});

test('should sort by dateCreated', () => {
  const filters = {
    text: '',
    sortBy: 'dateCreated'
  };
  const result = getVisibleBlogs(blogs, filters);
  expect(result).toEqual([blogs[0], blogs[1], blogs[2]]);
});

test('should sort by dateEdited', () => {
  const filters = {
    text: '',
    sortBy: 'dateEdited'
  };
  const result = getVisibleBlogs(blogs, filters);
  expect(result).toEqual([blogs[2], blogs[1], blogs[0]]);
});