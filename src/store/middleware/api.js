import * as actions from '../api';
import testData from '../../testData';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const searchFunc = (data, key, value) => {
    if (key === "title") {
        return data.filter(item => { return item.title.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1 });
    }

    return data.filter(item => item.releaseYear >= Number(value));
}

const fakeApiCall = async request => {
    const [search, sort, count, filter] = request.url.split("?")[1].split("&");
    const searchedData = searchFunc(testData.entries, search.split("=")[0], search.split("=")[1]); 
    const responseData = searchedData.slice(0, count.split("=")[1]);
    await sleep(2000);
    return { status: 200, data: responseData };
};

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type)
        return next(action);
    
    const { url, method, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const response = await fakeApiCall({
            baseURL: "http://fakeapiurl/api",
            url,
            method
        });
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        if (onError) dispatch({ type: onError, payload: error.message });
    }
}

export default api;