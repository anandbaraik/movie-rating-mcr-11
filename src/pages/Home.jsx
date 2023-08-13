import React, { useState } from 'react'
import {useApp} from "../context/AppContextProvider";
import { Flex, Select, Text, Button, Heading } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { getFilteredMovies,getGenres, generateYearsInRange, getRatingsInRange } from '../util/Util';
const Home = () => {
	const navigate = useNavigate();
  	const {movies, updateFilter, filters} = useApp();
	const genres = getGenres(movies);
	const years = generateYearsInRange(1990, 2023);
	const ratings = getRatingsInRange(1, 10);
  	const filteredMovies = getFilteredMovies(movies, filters);
  return (
    <Flex m={5} maxW={'90vw'} flexDir={'column'}>
      <Flex mb={5} mt={2} mx={'auto'} flexDir={'row'} justifyContent={'center'} alignItems={'center'} gap={10}>
        <Heading fontSize={{ base: '1rem', lg: '1.2rem' }}>
			Movies
		</Heading>
        <Flex maxW={'400px'}>
          <Select value={filters.genre}
            onChange={updateFilter} name='genre'>
				<option value="all">All Genre</option>
				{
					genres?.map((genre) => {
						return (
							<option key={genre} value={genre}>{genre}</option>
						)
					})
				}
          </Select>
        </Flex>
        <Flex maxW={'400px'}>
          <Select placeholder='Release year' value={filters.year}
            onChange={updateFilter} name='year'>
              {
					years?.map((year) => {
						return (
							<option key={year} value={year}>{year}</option>
						)
					})
				}
          </Select>
        </Flex>
        <Flex w={'200px'}>
          <Select placeholder='Rating' value={filters.rating}
            onChange={updateFilter} name='rating'>
				{
					ratings?.map((rating) => {
						return (
							<option key={rating} value={rating}>{rating}</option>
						)
					})
				}
          </Select>
        </Flex>
        <Button onClick={() => navigate('/add-movie')}>
          Add a movie
        </Button>
      </Flex>
	  	<Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={2}>
			{
				(filteredMovies?.length > 0) ? (
					filteredMovies?.map((movie) => {
					return (
						<MovieCard key={movie.id} movie={movie}/>
					)
				})) : (
					<Heading textAlign="center" mt={4} size="lg" color="red.700">
						No movies found
					</Heading>
				)
			}
		</Flex>
    </Flex>
  )
}

export default Home