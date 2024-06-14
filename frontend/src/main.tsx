// import React, { Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import ErrorPage from "./Errorpage";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import BookList from './components/BookList';
// import BookDetail from './components/BookDetail';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <BookList />,
//       },
//       {
//         path: "book/:title",
//         element: <BookDetail />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Suspense fallback={<div>Loading...</div>}>
//       <RouterProvider router={router} />
//     </Suspense>
//   </React.StrictMode>
// );

// import React, { Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import ErrorPage from "./Errorpage";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import BookList from './components/BookList';
// import BookDetail from './components/BookDetail';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <BookList />,
//       },
//       {
//         path: "book/:title",
//         element: <BookDetail />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Suspense fallback={<div>Loading...</div>}>
//       <RouterProvider router={router} />
//     </Suspense>
//   </React.StrictMode>
// );

// src/main.tsx

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorPage from "./Errorpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import { BookProvider } from './contexts/BookContext';
// import { Book } from "./graphql/types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BookList />,
      },
      {
        path: "book/:title",
        element: <BookDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BookProvider books={[]} addBook={function (): void {
        throw new Error("Function not implemented.");
      } } removeBook={function (): void {
        throw new Error("Function not implemented.");
      } } readingList={[]}>
        <RouterProvider router={router} />
      </BookProvider>
    </Suspense>
  </React.StrictMode>
);