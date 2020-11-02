import {
    IImagesState,
    FETCH_IMAGES_START, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL,
    IFetchImagesStartAction, IFetchImagesSuccessAction, IFetchImagesFailAction,
    FetchImagesTypes
} from '../actions/actionTypes';


const initialState: IImagesState = {
    images: [],
    error: '',
    loading: false,
};

const fetchImagesStart = (state: IImagesState, action: IFetchImagesStartAction): IImagesState => {
    return { ...state, error: '', loading: true }
};

const fetchImagesSuccess = (state: IImagesState, action: IFetchImagesSuccessAction): IImagesState => {
    return { ...state, images: action.images, error: '', loading: false }
};

const fetchImagesFail = (state: IImagesState, action: IFetchImagesFailAction): IImagesState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchImagesTypes): IImagesState => {
    switch (action.type) {
        case FETCH_IMAGES_START: return fetchImagesStart(state, action);
        case FETCH_IMAGES_SUCCESS: return fetchImagesSuccess(state, action);
        case FETCH_IMAGES_FAIL: return fetchImagesFail(state, action);
        default: return state;
    }
};

export default reducer;
