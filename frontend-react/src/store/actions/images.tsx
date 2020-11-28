import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Image } from '../../models/Models';
import {
    FETCH_IMAGES_START, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL
} from './actionTypes';


// IMAGES
export const fetchImagesStart = () => {
    return {
        type: FETCH_IMAGES_START
    };
};

export const fetchImagesSuccess = (images: Image) => {
    return {
        type: FETCH_IMAGES_SUCCESS,
        images: images
    };
};

export const fetchImagesFail = (error: string) => {
    return {
        type: FETCH_IMAGES_FAIL,
        error: error
    };
};

export const fetchImages = () => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(fetchImagesStart());

        const url = `http://127.0.0.1:5000/images`;

        const headers = {
            'Content-Type': 'application/json',
        }

        axios.get(url, { headers: headers })
            .then(response => {
                dispatch(fetchImagesSuccess(response.data.images));
            })
            .catch(err => {
                dispatch(fetchImagesFail(err.response.data));
            });
    };
};
