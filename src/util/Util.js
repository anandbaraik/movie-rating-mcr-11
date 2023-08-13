export const getGenres = (movies) => {
    return [...new Set(movies.flatMap(({ genre }) => genre))].sort();
};

export const generateYearsInRange = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
}

export const getRatingsInRange = (low, high) => {
    const ratings = [];
    for (let rating = low; rating <= high; rating++) {
        ratings.push(rating);
    }
    return ratings;
}

const filterBySearch = (movies, filters) => {
    const search= filters?.search.trim();
    if(search == "") return movies;
    return movies.filter((movie) =>
        movie?.title.toLowerCase()?.includes(search?.toLowerCase()) ||
        movie?.cast?.some((actor) => actor?.toLowerCase()?.includes(search?.toLowerCase())) ||
        movie?.director?.toLowerCase()?.includes(search?.toLowerCase())
    );
}

const filterByGenre = (movies, filters) => {
    if(filters?.genre == "all") return movies;
    return movies?.filter((movie) => movie.genre.includes(filters.genre));
}

const filterByYear = (movies, filters) => {
    if(filters?.year == "") return movies;
    return movies?.filter((movie) => movie.year == filters.year);
}

const filterByRating = (movies, filters) => {
    if(filters?.rating == "") return movies;
    return movies?.filter((movie) => movie.rating == filters.rating);
}
export const getFilteredMovies = (movies, filters) => {
    const filterFunctions = [
        filterBySearch,
        filterByGenre,
        filterByYear,
        filterByRating,
    ];
    return filterFunctions.reduce((acc, func) => func(acc, filters), movies);
}