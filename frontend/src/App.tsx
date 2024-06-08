// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache()
// });

// client
//   .query({
//     query: gql`
//     query Books {
//       books {
//         author
//         coverPhotoURL
//         readingLevel
//         title
//       }
//     }
//     `,
//   })
//   .then((result) => console.log(result));
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Container from '@mui/material/Container';
import { useState } from 'react';

import BookList from './components/BookList.tsx';
import ReadingList from './components/ReadingList.tsx';
import SearchBar from './components/SearchBar.tsx';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

function App() {
  const [search, setSearch] = useState('');
  const [readingList, setReadingList] = useState([]);
  
  const addBook = (book) => setReadingList([...readingList, book]);
  
  const removeBook = (removedBook) => {
    setReadingList(readingList.filter(book => book !== removedBook));
  }


  return (
    <ApolloProvider client={client}>
      <Container>
        <SearchBar setSearch={setSearch} />
        <BookList search={search} addBook={addBook} />
        <ReadingList readingList={readingList} removeBook={removeBook} />
      </Container>
    </ApolloProvider>
  );
}

export default App;