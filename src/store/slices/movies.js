import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

let id = 0;
const movieSlice = createSlice({
    name: "movies",
    initialState: {
        moviesById: {},
        movieIdArr: [],
        loading: false,
        key: 'releaseYear',
        value: '2010',
        filterBy: '',
        orderBy: 'title',
        order: 'asc',
        limit: 30,
    },
    reducers: {
        moviesRequested: (movies, action) => {
            movies.loading = true;
        },
        moviesReceived: (movies, action) => {
            movies.loading = false;
            movies.moviesById = {};
            movies.movieIdArr = [];
            
            action.payload.forEach(movie => {
                const movieId = ++id;
                movies.moviesById[movieId] = movie;
                movies.movieIdArr.push(movieId);
            });
        },
        moviesRequestFailed: (movies, action) => {
            movies.loading = false;
        },
        moviesSetSearch: (movies, action) => {
            movies.key = action.payload.key;
            movies.value = action.payload.value;
        },
        moviesSetSort: (movies, action) => {
            movies.orderBy = action.payload.orderBy;
            movies.order = action.payload.order;
        },
        moviesSetFilter: (movies, action) => {
            movies.filterBy = action.payload.filterBy;
        }
    }
});

export default movieSlice.reducer;
const { 
    moviesRequested,
    moviesReceived,
    moviesRequestFailed,
    moviesSetSearch,
    moviesSetSort,
    moviesSetFilter
} = movieSlice.actions;

const url = "/movies"
export const loadMovies = () => (dispatch, getState) => {
    const { key, value, filterBy, orderBy, order, limit } = getState().entities.movies;
    let getUrl = url + `?searchBy=${key}:${value}&sortBy=${orderBy}:${order}&count=${limit}`;
    if (filterBy) getUrl += `&filterBy=programType:${filterBy}`;
    dispatch(
        apiCallBegan({
            url: getUrl,
            onStart: moviesRequested.type,
            onSuccess: moviesReceived.type,
            onError: moviesRequestFailed.type  
        })
    );
};

export const searchMovies = (key, value) => (dispatch) => {
    dispatch(moviesSetSearch({key, value}));
}

export const sortMovies = (orderBy, order) => (dispatch) => {
    dispatch(moviesSetSort({orderBy, order}));
}

export const filterMovies = (filterBy) => (dispatch) => {
    dispatch(moviesSetFilter({filterBy}));
}

export const selectMovies = createSelector (
    state => state.entities.movies,
    movies => Object.values(movies.moviesById)
);

export const selectSearchValue = createSelector(
    state => state.entities.movies,
    movies => movies.value
);