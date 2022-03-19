import { combineReducers } from "redux";
import moviesReducer from './slices/movies';

export default combineReducers({
    movies: moviesReducer
});