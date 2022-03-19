import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, selectAllMovies } from "../store/slices/movies";

const MoviesList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(selectAllMovies);

    useEffect(() => {
        dispatch(loadMovies());
    }, [])

    return (
        <ul>
            {movies.map((movie) => <li key={movie.title}>{movie.title}</li>)}
        </ul>
    );
}

export default MoviesList;