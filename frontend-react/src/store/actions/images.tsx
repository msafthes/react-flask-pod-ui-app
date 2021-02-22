import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Image } from '../../models/Models';
import {
    FETCH_IMAGES_START, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL,
    REMOVE_IMAGES_START, REMOVE_IMAGES_SUCCESS, REMOVE_IMAGES_FAIL,
    PRUNE_IMAGES_START, PRUNE_IMAGES_SUCCESS, PRUNE_IMAGES_FAIL,
} from './actionTypes';


// IMAGES

// Fetch
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

// Remove
export const removeImagesStart = () => {
    return {
        type: REMOVE_IMAGES_START
    };
};

export const removeImagesSuccess = (images: Image) => {
    return {
        type: REMOVE_IMAGES_SUCCESS,
        images: images
    };
};

export const removeImagesFail = (error: string) => {
    return {
        type: REMOVE_IMAGES_FAIL,
        error: error
    };
};

export const removeImages = (imageIds: Array<String>) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        console.log("removeImages()");
        dispatch(removeImagesStart());

        const url = `http://127.0.0.1:5000/images`;

        const headers = {
            'Content-Type': 'application/json',
        }

        axios.delete(url, {
            headers: headers,
            data: {
                IDs: imageIds
            }
        }).then(response => {
            dispatch(removeImagesSuccess(response.data.images));
        }).catch(err => {
            dispatch(removeImagesFail(err.response.data));
        });
    };
};

// Prune
export const pruneImagesStart = () => {
    return {
        type: PRUNE_IMAGES_START
    };
};

export const pruneImagesSuccess = (images: Image) => {
    return {
        type: PRUNE_IMAGES_SUCCESS,
        images: images
    };
};

export const pruneImagesFail = (error: string) => {
    return {
        type: PRUNE_IMAGES_FAIL,
        error: error
    };
};

export const pruneImages = () => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        console.log("pruneImages()");
        dispatch(pruneImagesStart());

        const url = `http://127.0.0.1:5000/images/prune`;

        const headers = {
            'Content-Type': 'application/json',
        }

        axios.delete(url, {
            headers: headers,
        }).then(response => {
            dispatch(pruneImagesSuccess(response.data.images));
        }).catch(err => {
            dispatch(pruneImagesFail(err.response.data));
        });
    };
};
