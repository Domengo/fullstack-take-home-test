import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: 
    () => booksData,

    // (_: never, {offset, limit}: never) => {
    //   return booksData.slice(offset, offset + limit);
    // },
  },
};
