import React from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContextProvider";
import {Button,Card,CardBody,Flex,Heading,Image,Text} from "@chakra-ui/react";
const MovieDetails = () => {
  const {movies, giveAStar, addToWatchList, starredMovies, watchList, removeFromWatchList,
    unstarMovie} = useApp();

  const { id:movieId } = useParams();
  const movie = movies.find(({ id }) => id == movieId);

  const isStarred = starredMovies?.some(({id}) => id == movie.id);
  const isInWatchlist = watchList?.some(({id}) => id == movie.id);

  const watchListHandler = () => {
      if(isInWatchlist) {
          removeFromWatchList(movie.id);
      } else {
          addToWatchList(movie);
      }
  }

  const starHandler = () => {
      if(isStarred) {
          unstarMovie(movie.id);
      } else {
          giveAStar(movie);
      }
  }
  return (
    <Flex as={"main"} flexDir="column" alignItems="center" gap={4} p={3}>
      <Card
        overflow="hidden"
        boxShadow="xl"
        w="90%"
        p={5}
        direction={{ base: "column", sm: "row" }}
      >
        <Image
          objectFit="cover"
          maxW="20rem"
          src={movie.imageURL}
          alt={movie.title}
        />
        <CardBody>
          <Flex flexDir="column" gap={4}>
            <Heading>{movie.title}</Heading>
            <Text>{movie.summary}</Text>
            <Text>Year: {movie.year}</Text>
            <Text>Genre: {movie.genre.join(", ")}</Text>
            <Text>Rating: {movie.rating}</Text>
            <Text>Director: {movie.director}</Text>
            <Text>Writer: {movie.writer}</Text>
            <Text>Cast: {movie.cast.join(", ")}</Text>
            <Flex w="full" justifyContent="space-between">
              <Button
                onClick={starHandler}
              >
                {isStarred ? "Starred/Unstar" : "Star"}
              </Button>
              <Button
                onClick={watchListHandler}
              >
                {isInWatchlist
                ? "Remove Watchlist"
                : "Add to Watchlist"}
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default MovieDetails;