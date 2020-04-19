import * as actionTypes from './actionTypes';
import axios from 'axios';

import { AsyncAction } from 'redux-promise-middleware';


export const fetchImages = (): AsyncAction => ({
    type: 'FETCH_IMAGES',
    payload: axios.get('http://127.0.0.1:5000/images')
        .then(response => response.data)
});


export const setImages = (ingredients) => {
    return {
        type: actionTypes.FETCH_IMAGES,
        ingredients: ingredients
    };
};

export const fetchImagesFailed = () => {
    return {
        type: actionTypes.FETCH_IMAGES_FAILED
    };
};
