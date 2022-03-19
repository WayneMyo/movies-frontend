import { createSelector, createSlice } from '@reduxjs/toolkit';
import testData from '../testData';

let id = 0;
const movieSlice = createSlice({
    name: "movies",
    initialState: {
        moviesById: {},
        movieIdArr: []
    },
    reducers: {
        moviesReceived: (movies, action) => {
            action.payload.forEach(movie => {
                const movieId = ++id;
                movies.moviesById[movieId] = movie;
                movies.movieIdArr.push(movieId);
            });
        }
    }
});

export default movieSlice.reducer;
const { moviesReceived } = movieSlice.actions;

export const loadMovies = () => (dispatch, getState) => {
    dispatch(moviesReceived(testData.entries));
};

export const selectAllMovies = createSelector (
    state => state.entities.movies,
    movies => Object.values(movies.moviesById)
);