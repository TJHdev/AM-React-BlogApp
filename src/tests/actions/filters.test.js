import { setTextFilter,
  sortByDateCreated,
  sortByDateEdited,
  sortByTitle
} from '../../actions/filters';

test('should return setTextFilter action object', () => {
  const action = setTextFilter('testing');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'testing'
  });
});

test('should return sortByDateCreated action object', () => {
  const action = sortByDateCreated();
  expect(action).toEqual({
    type: 'SORT_BY_DATE_CREATED'
  })
});

test('should return sortByDateEdited action object', () => {
  const action = sortByDateEdited();
  expect(action).toEqual({
    type: 'SORT_BY_DATE_EDITED'
  });
});

test('should return sortByTitle action object', () => {
  const action = sortByTitle();
  expect(action).toEqual({
    type: 'SORT_BY_TITLE'
  });
});
