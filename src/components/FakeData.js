import {
  comment1,
  comment2,
  comment3,
  post1,
  post2,
  post3,
} from './FakeDataPoints';

export const isAuthed = true;
export const userData = { username: 'Bill Chen', userImg: 'B' };

export const postList = [post1, post2, post3];
export const commentList = [comment1, comment2, comment3];

export const tagList = {
  0: 'social media influencers',
  1: 'national service',
  2: 'psle',
  3: 'cpf',
  4: 'aloysious pang',
  5: 'inequality',
};

export const categoryData = [
  { category: 'trending', categoryData: [...postList] },
  { category: 'controversial', categoryData: [post1, post2] },
  { category: 'deep dive', categoryData: [post1] },
];
