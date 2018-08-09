import database from '../firebase/firebase.js'

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// component calls action generator
// action generator returns function
// component dispatches object (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

export const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  blog: blog
})

export const startAddBlog = (blogData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      body = '',
      createdAt = 0,
      lastEditedAt = 0
    } = blogData;
    
    const blog = { title, body, createdAt, lastEditedAt };

    return database.ref(`users/${uid}/blogs`).push(blog).then((ref) => {
      dispatch(addBlog({
        id: ref.key,
        ...blog
      }));
    });
  };
};

export const removeBlog = ({ id } = {}) => ({
  type: 'REMOVE_BLOG',
  id: id
});

export const startRemoveBlog = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/blogs/${id}`).set(null).then(() => {
      dispatch(removeBlog({ id }));
    });
  }
};

export const editBlog = (id, updates) => ({
  type: 'EDIT_BLOG',
  id: id,
  updates
});

export const startEditBlog = (id, updates = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/blogs/${id}`).update(updates).then(() => {
      dispatch(editBlog(id, updates));
    }); 
  };
};

export const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  blogs: blogs
});

export const startSetBlogs = (blogsData = []) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/blogs`).once('value').then((snapshot) => {
      const blogs = [];
      snapshot.forEach((childSnapshot) => {
        blogs.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setBlogs(blogs));
    });
  }
};

export const startSetBlogsPublic = (blogsData = []) => {
  return (dispatch, getState) => {
    return database.ref('users').once('value').then((snapshot) => {
      const blogs = [];
      const val = snapshot.val();

      Object.keys(val).forEach((childSnapshot) => {
        Object.keys(val[childSnapshot].blogs).forEach((blog) => {
          blogs.push({
            id: blog,
            ...snapshot.val()[childSnapshot].blogs[blog]
          })
        })
      })
      dispatch(setBlogs(blogs));
    });
  }
};

