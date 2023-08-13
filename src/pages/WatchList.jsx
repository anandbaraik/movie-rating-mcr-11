import React from 'react'
import { useApp } from '../context/AppContextProvider'
import { Flex, Heading } from '@chakra-ui/react';
import MovieCard from '../components/MovieCard';
const WatchList = () => {
  const {watchList} = useApp();
  return (
    <Flex>
      <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
			{
				(watchList?.length > 0) ? (
					watchList?.map((movie) => {
					return (
						<MovieCard key={movie.id} movie={movie}/>
					)
				})) : (
					<Heading textAlign="center" mt={4} size="lg" color="red.700">
						No watchList
					</Heading>
				)
			}
      </Flex>
    </Flex>
  )
}

export default WatchList