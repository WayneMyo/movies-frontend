import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadMovies, selectMovies, selectSearchValue, searchMovies, sortMovies, filterMovies } from "../store/slices/movies";
import Card from "../components/Card";
import Searchbox from '../components/Searchbox';
import DropDownMenu from '../components/DropdownMenu';

const HomePage = () => {
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const searchVal = event.target.value.trim();
        const key = searchVal.length >= 3 ? 'title' : 'releaseYear';
        const value = searchVal.length >= 3 ? searchVal: '2010';
        dispatch(searchMovies(key, value));
    };

    const sortOptions = [
        { label: 'Sort by year in descending order', value: 'releaseYear=DESC' },
        { label: 'Sort by year in ascending order', value: 'releaseYear=ASC' },
        { label: 'Sort by title in descending order', value: 'title=DESC' },
        { label: 'Sort by title in ascending order', value: 'title=ASC' },
    ];

    const filterOptions = [
        { label: 'Filter by series', value: 'series' },
        { label: 'Filter by movies', value: 'movies' },
    ];

    const [sortBy, setSortBy] = useState(sortOptions[3].value);
    const [filterBy, setFilterBy] = useState('');

    const searchVal = useSelector(selectSearchValue);
    const movies = useSelector(selectMovies);

    useEffect(() => {
        dispatch(loadMovies());
        if (sortBy) {
            const [orderBy, order] = sortBy.split("=");
            dispatch(sortMovies(orderBy, order))
        }

        if (filterBy) dispatch(filterMovies(filterBy));
    }, [sortBy, filterBy, searchVal])

    return (
        <HomePageStyled>
            <div className="top-container">
                <Searchbox title='Search by title' onChangeFunc={handleSearch} position="right"/>
                <DropDownMenu options={sortOptions} onChangeFunc={setSortBy} currentVal={sortBy}/>
                <DropDownMenu options={filterOptions} onChangeFunc={setFilterBy} currentVal={filterBy}/>
            </div>
            <div className="bottom-container">
                {movies.map((movie) => <Card
                    key={movie.title} 
                    title={movie.title}
                    leftLabel={movie.programType.charAt(0).toUpperCase() + movie.programType.slice(1)}
                    rightLabel={movie.releaseYear}
                    description={movie.description}
                    imgSrc={movie.images["Poster Art"] ? movie.images["Poster Art"].url : ""}
                />)} 
            </div>
        </HomePageStyled>
    );
};

const HomePageStyled = styled.header`
    width: 100vw;
    height: 100vh;
    position: relative;

    .top-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 5rem;
        @media screen and (min-width:1200px){
            margin: 0 10rem;
        }
    }
    
    .bottom-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
    }
`;

export default HomePage;