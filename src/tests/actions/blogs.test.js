import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addBlog,
  startAddBlog,
  removeBlog,
  startRemoveBlog,
  editBlog,
  startEditBlog,
  setBlogs,
  startSetBlogs,
  startSetBlogsPublic
} from '../../actions/blogs';

import blogs from '../fixtures/blogs';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid: uid }};
const createMockStore = configureMockStore([thunk]);


beforeEach((done) => {
  database.ref('users').set(null).then(() => {
    const blogData = {};
    blogs.forEach(({ id, title, body, createdAt, lastEditedAt }) => {
      blogData[id] = { title, body, createdAt, lastEditedAt }
    });
  
    database.ref(`users/${uid}/blogs`).set(blogData).then(() => {
      done();
    });
  });
});

//ADD_BLOG
test('should setup add blog action object with provided values', () => {
  const action = addBlog( blogs[2] );
  expect(action).toEqual({
    type: 'ADD_BLOG',
    blog: blogs[2]
  });
});

test('should write to the database', (done) => {
  const store = createMockStore(defaultAuthState);
  const blogData = {
    title: 'Really',
    body: 'Shrek, the final',
    createdAt: 20000,
    lastEditedAt: 25000
  };

  store.dispatch(startAddBlog(blogData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_BLOG',
      blog: {
        id: expect.any(String),
        ...blogData
      }
    });

    return database.ref(`users/${uid}/blogs/${actions[0].blog.id}`).once('value')
  }).then((snapshot) => {
    const val = snapshot.val();
    expect(val).toEqual(blogData);
    done();
  })
});

test('should add blog with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const defaultBlogData = {
    title: '',
    body: '',
    createdAt: 0,
    lastEditedAt: 0
  };

  store.dispatch(startAddBlog(defaultBlogData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_BLOG',
      blog: {
        id: expect.any(String),
        ...defaultBlogData
      }
    })

    return database.ref(`users/${uid}/blogs/${actions[0].blog.id}`).once('value')
  }).then((snapshot) => {
    const val = snapshot.val();
    expect(val).toEqual(defaultBlogData);
    done();
  })
});

// REMOVE_BLOG
test('should setup remove blog action object with provided values', () => {
  const action = removeBlog({ id: blogs[2].id });
  expect(action).toEqual({
    type: 'REMOVE_BLOG',
    id: blogs[2].id
  })
});

test('should remove blogs from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  
  store.dispatch(startRemoveBlog({ id: blogs[2].id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_BLOG',
      id: blogs[2].id
    });
    return database .ref(`users/${uid}/blogs/${blogs[2].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  })
}); 

// EDIT_BLOG
test('should setup edit blog action object with provided values', () => {
  const updates = {
    title: 'testing title update',
    body: 'testing body update',
    createdAt: 99999,
    lastEditedAt: 199999,
  }
  const action = editBlog(blogs[2].id, updates);
  expect(action).toEqual({
    type: 'EDIT_BLOG',
    id: blogs[2].id,
    updates: updates
  });
});

test('should edit blogs from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const updateData = {
    title: 'testing title update',
    body: 'testing body update',
    createdAt: 99999,
    lastEditedAt: 199999,
  }

  store.dispatch(startEditBlog(blogs[0].id, updateData)).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: 'EDIT_BLOG',
      id: blogs[0].id,
      updates: updateData
    });

    return database .ref(`users/${uid}/blogs/${blogs[0].id}`).once('value');
  }).then((snapshot) => {
      const val = snapshot.val();
      expect(val).toEqual({
        ...updateData
      })
    done()
  })
});

// SET_BLOG

test('should setup set blog action object with provided values', () => {
  const action = setBlogs(blogs);
  expect(action).toEqual({
    type: 'SET_BLOGS',
    blogs: blogs
  });
});

test('should set the state to match items from the database', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetBlogs()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_BLOGS',
      blogs: blogs
    });
    done();
  });
});

test('should pull all blogs from the database regardless of user', (done) => {
  const store = createMockStore({ auth: { uid: 'alternativeId' }});
  
  const alternateBlogData = {
    title: 'testing title update',
    body: 'testing body update',
    createdAt: 99999,
    lastEditedAt: 199999,
  }

  store.dispatch(startAddBlog(alternateBlogData)).then(() => {
    store.dispatch(startSetBlogsPublic()).then(() => {

      const actions = store.getActions();
      expect(actions[1]).toEqual({
        type: 'SET_BLOGS',
        blogs: [{...alternateBlogData, id: expect.any(String)}, ...blogs]
      });
      done();
    });
  })
});