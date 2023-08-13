import { createContext, useContext, useState, useEffect } from "react";
import { movies as movieDatas } from "../assets/movies";

const AppContext = createContext({
    movies: []
});

export const AppContextProvider = ({ children }) => {
    const [movies, setMovies] = useState(() => {
        const storedMovies = localStorage.getItem('movies');
        return storedMovies ? JSON.parse(storedMovies) : movieDatas;
    });

  return (
    <AppContext.Provider
      value={{
        movies
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);