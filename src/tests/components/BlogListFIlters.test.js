import React from 'react';
import { shallow } from 'enzyme';
import blogs from '../fixtures/blogs';
import { filters, altFilters } from '../fixtures/filters';
import { BlogListFilters } from '../../components/BlogListFilters';
import moment from 'moment';

let setTextFilter, sortByDateCreated, sortByDateEdited, sortByTitle, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDateCreated = jest.fn();
  sortByDateEdited = jest.fn();
  sortByTitle = jest.fn();
  wrapper = shallow(
    <BlogListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDateCreated={sortByDateCreated}
      sortByDateEdited={sortByDateEdited}
      sortByTitle={sortByTitle}
    />
  );
});


test('should render BlogListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render BlogListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'mech';
  wrapper.find('input').prop('onChange')({target: {value}});
  expect(setTextFilter).toHaveBeenCalledWith('mech');
});

test('should sort by date created', () => {
  wrapper.setProps({
    filters: altFilters
  })
  const value = 'dateCreated';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByDateCreated).toHaveBeenCalledTimes(1);

});

test('should sort by date last edited', () => {
  const value = 'dateEdited';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByDateEdited).toHaveBeenCalledTimes(1);
});


test('should sort by title', () => {
  const value = 'title';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByTitle).toHaveBeenCalledTimes(1);
});