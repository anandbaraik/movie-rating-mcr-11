import { createContext, useContext, useState, useEffect } from "react";
import { movies as movieDatas } from "../assets/movies";

const AppContext = createContext({
    movies: [],
    starredMovies: [],
    watchList:[],
    filters: {},
	addToWatchList: () => {},
	removeFromWatchList: () => {},
	giveAStar: () => {},
	unstarMovie: () => {},
	addMovie: () => {}
});

export const AppContextProvider = ({ children }) => {
    const [movies, setMovies] = useState(() => {
        const storedMovies = localStorage.getItem('movies');
        return storedMovies ? JSON.parse(storedMovies) : movieDatas;
    });

    const [starredMovies, setStarredMovies] = useState(() => {
        const storedStarredMovies = localStorage.getItem('starred');
        return storedStarredMovies ? JSON.parse(storedStarredMovies) : [];
    });

    const [watchList, setWatchList] = useState(() => {
      const storedWatchListMovies = localStorage.getItem('watchlist');
      return storedWatchListMovies ? JSON.parse(storedWatchListMovies) : [];
    });

    const [filters, setFilters] = useState(() => {
      const storedFilters = localStorage.getItem('filters');
      return storedFilters ? JSON.parse(storedFilters) : {search: "",
      genre: "all",
      year: "",
      rating: "",};
    });

    const addToWatchList = (movie) => {
      const updatedWatchList = [...watchList, movie];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchList));
      setWatchList(updatedWatchList);
    }

    const removeFromWatchList = (movieId) => {
      const updatedWatchList = watchList?.filter(({id}) => id != movieId);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchList));
      setWatchList(updatedWatchList);
    }

    const giveAStar = (movie) => {
      const updatedStarredMovies = [...starredMovies, movie];
      localStorage.setItem('starred', JSON.stringify(updatedStarredMovies));
      setStarredMovies(updatedStarredMovies);
    }

    const unstarMovie = (movieId) => {
      const updatedStarredMovies = starredMovies?.filter(({id}) => id != movieId);
      localStorage.setItem('starred', JSON.stringify(updatedStarredMovies));
      setStarredMovies(updatedStarredMovies);
    }

	const addMovie = (movie) => {
		const updatedMovies = [...movies, movie];
		localStorage.setItem('movies', JSON.stringify(updatedMovies));
		setMovies(updatedMovies);
	}

	const updateFilter = (e) => {
		const updatedFilters = {...filters, [e.target.name]:e.target.value};
      	localStorage.setItem('filters', JSON.stringify(updatedFilters));
		setFilters(updatedFilters);
	}
  return (
    <AppContext.Provider
      value={{
        movies,
        starredMovies,
        watchList,
        filters,
        addToWatchList,
        removeFromWatchList,
        giveAStar,
        unstarMovie,
		addMovie,
		updateFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);