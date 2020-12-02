import {
    IImagesState,
    FETCH_IMAGES_START, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL,
    IFetchImagesStartAction, IFetchImagesSuccessAction, IFetchImagesFailAction,
    FetchImagesTypes,
    REMOVE_IMAGES_START, REMOVE_IMAGES_SUCCESS, REMOVE_IMAGES_FAIL,
    IRemoveImagesStartAction, IRemoveImagesSuccessAction, IRemoveImagesFailAction,
    RemoveImagesTypes
} from '../actions/actionTypes';


const initialState: IImagesState = {
    images: [],
    error: '',
    loading: false,
};

// Fetch
const fetchImagesStart = (state: IImagesState, action: IFetchImagesStartAction): IImagesState => {
    return { ...state, error: '', loading: true }
};

const fetchImagesSuccess = (state: IImagesState, action: IFetchImagesSuccessAction): IImagesState => {
    return { ...state, images: action.images, error: '', loading: false }
};

const fetchImagesFail = (state: IImagesState, action: IFetchImagesFailAction): IImagesState => {
    return { ...state, error: action.error, loading: false }
};

// Remove
const removeImagesStart = (state: IImagesState, action: IRemoveImagesStartAction): IImagesState => {
    return { ...state, error: '', loading: true }
};

const removeImagesSuccess = (state: IImagesState, action: IRemoveImagesSuccessAction): IImagesState => {
    return { ...state, images: action.images, error: '', loading: false }
};

const removeImagesFail = (state: IImagesState, action: IRemoveImagesFailAction): IImagesState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchImagesTypes | RemoveImagesTypes): IImagesState => {
    switch (action.type) {
        case FETCH_IMAGES_START: return fetchImagesStart(state, action);
        case FETCH_IMAGES_SUCCESS: return fetchImagesSuccess(state, action);
        case FETCH_IMAGES_FAIL: return fetchImagesFail(state, action);
        case REMOVE_IMAGES_START: return removeImagesStart(state, action);
        case REMOVE_IMAGES_SUCCESS: return removeImagesSuccess(state, action);
        case REMOVE_IMAGES_FAIL: return removeImagesFail(state, action);
        default: return state;
    }
};

export default reducer;
