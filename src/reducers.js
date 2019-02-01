// auth actions
// signup
// login
// logout

// post actions
// create post
// filter post by chips
// like post
// add comment
// view post

// profile actions
// view profile

// user collection
const user = {
  id: 0,
  firstName: 'Michael',
  lastName: 'Jackson',
  initials: 'MJ',
};

// post collection
const post = {
  uid: 0,
  name: 'Bill Chen',
  initials: 'BC',
  id: 0,
  title: '',
  description:
    "They can't just do whatever they want and hope to get away with it",
  date: '7 Jan', // post page shows 7 Jan, feed page shows 1 day ago
  upvotes: 639,
  comments: 32,
  tagList: [0, 5],
  commentList: [{ comment: {} }, { comment: {} }, { comment: {} }],
  categoryId: 0, // randomize category upon creating post
};

// tag collection - fixed!
const tag = {
  id: 0,
  tagname: 'psle',
};

// category collection
const category = {
  id: 0,
  name: 'trending',
  postIds: [0, 1, 2, 3],
};
