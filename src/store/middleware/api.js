import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type)
        return next(action);
    
    const { url, method, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const response = await axios.request({
            baseURL: "http://127.0.0.1:8080/api",
            url,
            method
        });
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data.entries });
    } catch (error) {
        if (onError) dispatch({ type: onError, payload: error.message });
    }
}

export default api;