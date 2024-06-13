// import React, { Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import ErrorPage from "./Errorpage";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Suspense fallback={<div>Loading...</div>}>
//       <RouterProvider router={router} />
//     </Suspense>
//   </React.StrictMode>
// );

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorPage from "./Errorpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const BookList = lazy(() => import('./components/BookList'));
const BookDetail = lazy(() => import('./components/BookDetail'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
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
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
