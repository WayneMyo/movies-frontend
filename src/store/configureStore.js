import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';
import api from './middleware/api';

const configureStoreFunc = () => {
    return configureStore({
        reducer,
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api)
    });
};

export default configureStoreFunc;