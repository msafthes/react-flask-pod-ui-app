import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Image } from '../../models/Models';
import {
    FETCH_IMAGES_START, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL,
    REMOVE_IMAGES_START, REMOVE_IMAGES_SUCCESS, REMOVE_IMAGES_FAIL,
    PRUNE_IMAGES_START, PRUNE_IMAGES_SUCCESS, PRUNE_IMAGES_FAIL,
    PULL_IMAGE_START, PULL_IMAGE_SUCCESS, PULL_IMAGE_FAIL,
} from './actionTypes';

import { API_BASE } from '../../config';


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

        const url = `${API_BASE}/images`;

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

        const url = `${API_BASE}/images`;

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

        const url = `${API_BASE}/images/prune`;

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

// Pull Image
export const pullImageStart = () => {
    return {
        type: PULL_IMAGE_START
    };
};

export const pullImageSuccess = (images: Image) => {
    return {
        type: PULL_IMAGE_SUCCESS,
        images: images
    };
};

export const pullImageFail = (error: string) => {
    return {
        type: PULL_IMAGE_FAIL,
        error: error
    };
};

export const pullImage = (name: string) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        console.log("pullImage()");
        dispatch(pullImageStart());

        const url = `${API_BASE}/images/pull`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const data = {
            name: name
        }

        axios.post(url, data, {
            headers: headers,
        }).then(response => {
            dispatch(pullImageSuccess(response.data.images));
        }).catch(err => {
            dispatch(pullImageFail(err.response.data));
        });
    };
};
