import React from 'react'
import { useApp } from '../context/AppContextProvider'
import { Flex, Heading } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
const StarredMovies = () => {
  const {starredMovies} = useApp();
  return (
    <Flex>
      <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
			{
				(starredMovies?.length > 0) ? (
					starredMovies?.map((movie) => {
					return (
						<MovieCard key={movie.id} movie={movie}/>
					)
				})) : (
					<Heading textAlign="center" mt={4} size="lg" color="red.700">
						No starred movies found
					</Heading>
				)
			}
      </Flex>
    </Flex>
  )
}

export default StarredMovies