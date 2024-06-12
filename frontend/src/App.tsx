import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Container from "@mui/material/Container";
import { ReactNode, useState } from "react";
import Navbar from "./components/Navbar.tsx";

import BookList from "./components/BookList.tsx";
import ReadingList from "./components/ReadingList.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/ui/Theme.ts";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function App() {
  const [search, setSearch] = useState("");
  const [readingList, setReadingList] = useState<
    { author: ReactNode; title: string }[]
  >([]);

  const addBook = (book: { author: ReactNode; title: string }) =>
    setReadingList([...readingList, book]);

  const removeBook = (removedBook: { author: ReactNode; title: string }) => {
    setReadingList(
      readingList.filter((book) => book.title !== removedBook.title)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Container>
          <Navbar setSearch={setSearch} />
          <BookList
            search={search}
            addBook={addBook}
            removeBook={removeBook}
            readingList={readingList}
          />
          <ReadingList readingList={readingList} removeBook={removeBook} />
        </Container>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
