import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from "./theme";
import RootLayout from "./components/RootLayout";

import ErrorPage from "./pages/ErrorPage";
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import MovieDetails from "./pages/MovieDetails";
import StarredMovies from "./pages/StarredMovies";
import WatchList from "./pages/WatchList";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
        <RootLayout />
    ),
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/add-movie',
        element: <AddMovie />,
      },
      {
        path: '/movie/:id/details',
        element: <MovieDetails />,
      },
      {
        path: '/starred-movies',
        element: <StarredMovies/>,
      },
      {
        path: '/watch-list',
        element: <WatchList/>,
      }
    ],
  }
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;