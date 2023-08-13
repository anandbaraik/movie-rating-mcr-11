import React, { useState } from "react";
import { useApp } from '../context/AppContextProvider'
import { v4 as uuid } from "uuid";
import {Flex,Button,FormControl,FormLabel,Input, FormHelperText} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const initialMovieState = {
  title: "",
  summary: "",
  year: "",
  cast: [],
  genre: [],
  rating: "",
  director: "",
  writer: "",
  imageURL: "",
};
const AddMovie = () => {
  const {addMovie} = useApp();
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState(initialMovieState);
  const submitHandler = (e) => {
    e.preventDefault();
    addMovie({
		...movieInfo,
		rating: +movieInfo.rating,
		year: +movieInfo.year,
		cast: movieInfo.cast.map((item) => item.trim()), //to remove any space
		genre: movieInfo.genre.map((item) => item.trim()), //to remove any space
		id: uuid(),
		imageURL: movieInfo?.imageURL || `https://placehold.co/600x400?text=${movieInfo?.title}`
	});
	navigate('/');
    setMovieInfo(initialMovieState);
  };

  const handleFormInput = (e) => {
    setMovieInfo((movieInfo) => ({
      ...movieInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormArrayInput = (e) => {
    setMovieInfo((movieInfo) => ({
      ...movieInfo,
      [e.target.name]: e.target.value.split(","),
    }));
  };
  return (
    <Flex m={5} p={5} justifyContent={'center'}>
      <form onSubmit={submitHandler}>
		<Flex flexDir="column" gap={2} maxW={'450px'}>
			<FormControl isRequired>
			<FormLabel>Title</FormLabel>
			<Input
				name="title"
				value={movieInfo.title}
				onChange={handleFormInput}
			/>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Summary</FormLabel>
			<Input
				name="summary"
				value={movieInfo.summary}
				onChange={handleFormInput}
			/>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Year</FormLabel>
			<Input
				type="number"
				min={0}
				name="year"
				value={movieInfo.year}
				onChange={handleFormInput}
			/>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Cast</FormLabel>
			<Input
				name="cast"
				value={movieInfo.cast.join(",")}
				onChange={handleFormArrayInput}
			/>
			  <FormHelperText>Enter comma separated cast's name</FormHelperText>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Genre</FormLabel>
			<Input
				name="genre"
				value={movieInfo.genre.join(",")}
				onChange={handleFormArrayInput}
			/>
			<FormHelperText>Enter comma separated genre</FormHelperText>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Rating</FormLabel>
			<Input
				type="number"
				min={0}
				max={10}
				name="rating"
				value={movieInfo.rating}
				onChange={handleFormInput}
			/>
			<FormHelperText>Rating between 1 to 10</FormHelperText>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Director</FormLabel>
			<Input
				name="director"
				value={movieInfo.director}
				onChange={handleFormInput}
			/>
			</FormControl>
			<FormControl isRequired>
			<FormLabel>Writer</FormLabel>
			<Input
				name="writer"
				value={movieInfo.writer}
				onChange={handleFormInput}
			/>
			</FormControl>
			<FormControl>
			<FormLabel>Image URL</FormLabel>
			<Input
				name="imageURL"
				value={movieInfo.imageURL}
				onChange={handleFormInput}
			/>
			</FormControl>
		</Flex>
		<Button color="blue" type="submit" mt={5}>
			Add Movie
		</Button>
        </form>
    </Flex>
  )
}

export default AddMovie