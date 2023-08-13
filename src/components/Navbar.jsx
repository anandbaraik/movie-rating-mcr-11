import React from 'react'
import {Flex, HStack, Heading, useColorModeValue, Input} from '@chakra-ui/react';
import {ColorModeSwitcher} from "../ColorModeSwitcher"
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContextProvider';
const Navbar = () => {
  const {updateFilter, filters} = useApp();
  return (
    <Flex
      justifyContent={'space-between'}
      gap="1rem"
      alignItems={'center'}
      px={{ base: 2, lg: 4 }}
      py={2}
      borderBottom="1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
    >
      <HStack spacing={4} >
        <Heading fontSize={{ base: '1.1rem', lg: '1.5rem' }} >
            IMDB
        </Heading>
      </HStack>
      <Input type='text' placeholder='Search movies by title, cast and director' width='auto' name='search' onChange={updateFilter} value={filters.search}/>
      <Flex>
        <HStack spacing={4} >
          <Link to={'/'}>
            Movies
          </Link>
          <Link to={'/watch-list'}>
          Watch list
          </Link>
          <Link to={'/starred-movies'}>
            StarredMovies
          </Link>
        </HStack>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Flex>
  )
}
export default Navbar