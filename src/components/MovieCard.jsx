import React from 'react'
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContextProvider'
const MovieCard = ({movie}) => {
    const {giveAStar, addToWatchList, starredMovies, watchList, removeFromWatchList,
        unstarMovie} = useApp();

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
    <Card w={'sm'}>
        <CardBody>
            <Link key={movie.id} to={`/movie/${movie.id}/details`}>
            <Image
                src={movie.imageURL}
                alt={movie.title}
                borderRadius='lg'
                objectFit="cover"
            />
            </Link>
            <Stack mt='6' spacing='3'>
            <Heading size='md'>
            {movie.title}
            </Heading>
            <Text>
            {movie.summary}
            </Text>
            </Stack>
        </CardBody>
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'
                onClick={starHandler}>
                {isStarred ? "Starred/Unstar" : "Star"}
            </Button>
            <Button variant='ghost' colorScheme='blue'
                onClick={watchListHandler}>
                {isInWatchlist
                ? "Remove Watchlist"
                : "Add to Watchlist"}
                </Button>
            </ButtonGroup>
        </CardFooter>
        </Card>
  )
}

export default MovieCard