import moment from 'moment';
import filtersReducers from '../../reducers/filters';
import { filters, altFilters } from '../fixtures/filters';


test('should setup default filter values', () => {
  const state = filtersReducers(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'dateCreated'
  });
});

test('should set text to the passed argument', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'testing yo!'
  };
  const state = filtersReducers(filters, action);
  expect(state.text).toBe('testing yo!');
});

test('should set sortBy to dateCreated', () => {
  const currentState = {
    text: '',
    sortBy: 'title',
  };
  const action = { type: 'SORT_BY_DATE_CREATED' };
  const state = filtersReducers(currentState, action);
  expect(state.sortBy).toBe('dateCreated');
});

test('should set sortBy to dateEdited', () => {
  const action = { type: 'SORT_BY_DATE_EDITED' };
  const state = filtersReducers(filters, action);
  expect(state.sortBy).toBe('dateEdited');
});

test('should set sortBy to title', () => {
  const action = { type: 'SORT_BY_TITLE' };
  const state = filtersReducers(filters, action);
  expect(state.sortBy).toBe('title');
});