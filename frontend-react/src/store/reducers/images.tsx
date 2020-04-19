import * as actionTypes from '../actions/actionTypes';

const initialState = {
    images: []
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const setImages = (state, action) => {
    return updateObject(state, {
        images: [...action.payload.images],
        error: false
    });
};

const fetchImagesFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case `${actionTypes.FETCH_IMAGES}_PENDING`:
            return state;

        case `${actionTypes.FETCH_IMAGES}_FULFILLED`:
            return setImages(state, action);
        // return {
        //     images: action.payload.message,
        // }

        case `${actionTypes.FETCH_IMAGES}_REJECTED`:
            return fetchImagesFailed(state, action);

        default: return state;
    }
};

export default reducer;
