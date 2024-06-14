// import { booksData } from '../data/books';

// export const resolvers = {
//   Query: {
//     books: 
//     () => booksData,
//   },
// };
import { booksData } from '../data/books';

interface Book {
  id: number;
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface QueryArgs {
  limit?: number;
  offset?: number;
}

export const resolvers = {
  Query: {
    books: (_: never, { limit, offset }: QueryArgs): Book[] => {
      const startIndex = offset ?? 0;           // Use nullish coalescing operator for fallback
      const endIndex = startIndex + (limit ?? booksData.length); // Use nullish coalescing operator
      const booksWithId = booksData.map((book, index) => ({ ...book, id: index + 1 }));
      return booksWithId.slice(startIndex, endIndex);
    }
  }
};