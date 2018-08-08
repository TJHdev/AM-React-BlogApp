const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text: text
});

const sortByDateCreated = () => ({
  type: 'SORT_BY_DATE_CREATED'
});

const sortByDateEdited = () => ({
  type: 'SORT_BY_DATE_EDITED'
});

const sortByTitle = () => ({
  type: 'SORT_BY_TITLE'
});

export { setTextFilter, sortByDateCreated, sortByDateEdited, sortByTitle };