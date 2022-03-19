import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';

const configureStoreFunc = () => {
    return configureStore({
        reducer
    });
};

export default configureStoreFunc;