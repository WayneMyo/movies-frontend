import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadMovies, selectMovies, selectSearchValue, searchMovies, sortMovies, filterMovies } from "../store/slices/movies";
import Card from "../components/Card";
import Searchbox from '../components/Searchbox';
import DropDownMenu from '../components/DropdownMenu';

const HomePage = () => {
    const dispatch = useDispatch();

    const sortOptions = [
        { label: 'Sort by year in descending order', value: 'releaseYear=desc' },
        { label: 'Sort by year in ascending order', value: 'releaseYear=asc' },
        { label: 'Sort by title in descending order', value: 'title=desc' },
        { label: 'Sort by title in ascending order', value: 'title=asc' },
    ];

    const filterOptions = [
        { label: 'Filter by series', value: 'series' },
        { label: 'Filter by movies', value: 'movie' },
    ];

    const [sortBy, setSortBy] = useState(sortOptions[3].value);
    const handleSort = (event) => {
        const sortVal = event.target.value.trim();
        const [orderBy, order] = sortVal.split("=");
        setSortBy(sortVal);
        dispatch(sortMovies(orderBy, order));
    };

    const [filterBy, setFilterBy] = useState('');
    const handleFilter = (event) => {
        const filterBy = event.target.value;
        if (filterBy) {
            setFilterBy(filterBy);
            dispatch(filterMovies(filterBy));
        }
    };


    const searchVal = useSelector(selectSearchValue);
    const handleSearch = (event) => {
        const searchVal = event.target.value.trim();
        const key = searchVal.length >= 3 ? 'title' : 'releaseYear';
        const value = searchVal.length >= 3 ? searchVal: '2010';
        dispatch(searchMovies(key, value));
    };

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
                <DropDownMenu options={sortOptions} onChangeFunc={handleSort} currentVal={sortBy}/>
                <DropDownMenu options={filterOptions} onChangeFunc={handleFilter} currentVal={filterBy}/>
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