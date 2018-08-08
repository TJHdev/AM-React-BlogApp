import moment from 'moment';

// Get visible blogs

const getVisibleBlogs = (blogs, { text, sortBy }) => {
  return blogs.filter((blog) => {
    const textMatch = blog.title.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  }).sort((a, b) => {
    if (sortBy === 'dateCreated') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'dateEdited') {
      return a.lastEditedAt < b.lastEditedAt ? 1 : -1;
    } else if (sortBy === 'title') {
      return a.title < b.title ? 1 : -1;
    }
  });
};

export default getVisibleBlogs;