import R from 'ramda';

/**
 *
 * creating tuples of props from nested objects
 * from ramda gitter
 */
const articles = [
  {
    title: 'Everything Sucks',
    url: 'http://do.wn/sucks.html',
    author: {
      name: 'Debbie Downer',
      email: 'debbie@do.wn'
    }
  },
  {
    title: 'If You Please',
    url: 'http://www.geocities.com/milq',
    author: {
      name: 'Caspar Milquetoast',
      email: 'hello@me.com'
    }
  }
];
// version 1
const getTitle = R.prop('title');
const getAuthorName = R.path(['author', 'name']);
const titleAndName = R.map(R.juxt([getTitle, getAuthorName]));
// version 2
const titleAndName2 = R.map(R.sequence(R.always, [R.prop('title'), R.path(['author', 'name'])]))(articles);

