import * as actions from '../api';
import testData from '../../testData';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fakeApiCall = async request => {
    console.log("LOG: request", request);
    await sleep(2000);
    return { status: 200, data: testData.entries.slice(0, 30) };
};

const api = ({ dispatch }) => next => async action => {
    console.log("LOG: action.type", action.type);
    if (action.type !== actions.apiCallBegan.type)
        return next(action);
    
    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const response = await fakeApiCall({
            baseURL: "http://fakeapiurl/api",
            url,
            method,
            data
        });
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        if (onError) dispatch({ type: onError, payload: error.message });
    }
}

export default api;