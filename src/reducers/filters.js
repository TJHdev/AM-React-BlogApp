import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'dateCreated',
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE_CREATED':
      return {
        ...state,
        sortBy: 'dateCreated'
      };
    case 'SORT_BY_DATE_EDITED':
      return {
        ...state,
        sortBy: 'dateEdited'
      };
    case 'SORT_BY_TITLE':
      return {
        ...state,
        sortBy: 'title'
      };
    default: 
      return state;
  }
};

export default filtersReducer;