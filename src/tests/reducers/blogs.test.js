import blogsReducer from '../../reducers/blogs';
import blogs from '../fixtures/blogs';

test('should setup default reducer values', () => {
  const state = blogsReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove blog by id', () => {
  const action = {
    type: 'REMOVE_BLOG',
    id: blogs[1].id
  };
  const state = blogsReducer(blogs, action);
  expect(state).toEqual([blogs[0], blogs[2]]);
});

test('should not remove blog if id not found', () => {
  const action = {
    type: 'REMOVE_BLOG',
    id: '-1'
  };
  const state = blogsReducer(blogs, action);
  expect(state).toEqual([...blogs]);
});

test('should setup add blog object to state', () => {
  const blog = {
    id: '105',
    title: 'Learning react',
    body: 'Seriously, learn react',
    createdAt: -19000,
    lastEditedAt: 2000
  };

  const action = {
    type: 'ADD_BLOG',
    blog: blog
  };

  const state = blogsReducer(blogs, action);
  expect(state).toEqual([...blogs, blog]);
});

test('should edit a blog by id', () => {
  const updates = {
    title: 'This is an UPDATE',
    body: 'Am seriously you guys',
    createdAt: 1999,
    lastEditedAt: 2001
  };

  const action = {
    type: 'EDIT_BLOG',
    id: blogs[2].id,
    updates: updates
  };

  const state = blogsReducer(blogs, action);
  expect(state).toEqual([blogs[0], blogs[1], {id: blogs[2].id, ...updates}]);
});

test('should not edit a blog if blog not found', () => {
  const updates = {
    title: 'This is an UPDATE',
    body: 'Am seriously you guys',
    createdAt: 1999,
    lastEditedAt: 2001
  };

  const action = {
    type: 'EDIT_BLOG',
    id: '-1',
    updates: updates
  };

  const state = blogsReducer(blogs, action);
  expect(state).toEqual(blogs);
});

test('should set blogs', () => {
  const action = {
    type: 'SET_BLOGS',
    blogs: [blogs[0]]
  }

  const state = blogsReducer(blogs, action);
  expect(state).toEqual([blogs[0]]);
});