import { createSelector, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from '../api';

let id = 0;
const movieSlice = createSlice({
    name: "movies",
    initialState: {
        moviesById: {},
        movieIdArr: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        moviesRequested: (movies, action) => {
            movies.loading = true;
        },
        moviesReceived: (movies, action) => {
            movies.loading = false;
            movies.lastFetch = Date.now();
            action.payload.forEach(movie => {
                const movieId = ++id;
                movies.moviesById[movieId] = movie;
                movies.movieIdArr.push(movieId);
            });
        },
        moviesRequestFailed: (movies, action) => {
            movies.loading = false;
        }
    }
});

export default movieSlice.reducer;
const { moviesRequested, moviesReceived, moviesRequestFailed } = movieSlice.actions;

const url = "/movies"
export const loadMovies = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.movies || 0;

    const minuteDiff = moment().diff(moment(lastFetch), 'minutes');
    if (minuteDiff < 10) return;

    dispatch(
        apiCallBegan({
            url,
            onStart: moviesRequested.type,
            onSuccess: moviesReceived.type,
            onError: moviesRequestFailed.type  
        })
    );
};

export const selectAllMovies = createSelector (
    state => state.entities.movies,
    movies => Object.values(movies.moviesById)
);