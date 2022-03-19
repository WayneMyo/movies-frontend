import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadMovies, selectAllMovies } from "../store/slices/movies";
import Card from "../components/Card";

const HomePage = () => {
    const dispatch = useDispatch();
    const movies = useSelector(selectAllMovies);

    useEffect(() => {
        dispatch(loadMovies());
    }, [])

    return (
        <HomePageStyled>
            {movies.map((movie) => <Card {...movie}/>)} 
        </HomePageStyled>
    );
};

const HomePageStyled = styled.header`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export default HomePage;