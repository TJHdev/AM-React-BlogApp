import moment from 'moment';

export default [{
  id: '1',
  title: 'mechanical engineering sucks',
  body: '',
  createdAt: 0,
  lastEditedAt: 0
}, {
  id: '2',
  title: 'are you sure you want to do this?',
  body: 'Body bOdy boDy bodY',
  createdAt: moment(0).subtract(4, 'days').valueOf(),
  lastEditedAt: moment(0).add(4, 'days').valueOf()
}, {
  id: '3',
  title: 'testing is the bane of existence',
  body: 'There are no issues here',
  createdAt: moment(0).subtract(14, 'days').valueOf(),
  lastEditedAt: moment(0).add(4, 'years').valueOf()
}];
