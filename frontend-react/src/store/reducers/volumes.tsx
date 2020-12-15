import {
    IVolumesState,
    FETCH_VOLUMES_START, FETCH_VOLUMES_SUCCESS, FETCH_VOLUMES_FAIL,
    IFetchVolumesStartAction, IFetchVolumesSuccessAction, IFetchVolumesFailAction,
    FetchVolumesTypes,
} from '../actions/actionTypes';


const initialState: IVolumesState = {
    volumes: [],
    error: '',
    loading: false,
};

// Fetch
const fetchVolumesStart = (state: IVolumesState, action: IFetchVolumesStartAction): IVolumesState => {
    return { ...state, error: '', loading: true }
};

const fetchVolumesSuccess = (state: IVolumesState, action: IFetchVolumesSuccessAction): IVolumesState => {
    return { ...state, volumes: action.volumes, error: '', loading: false }
};

const fetchVolumesFail = (state: IVolumesState, action: IFetchVolumesFailAction): IVolumesState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchVolumesTypes): IVolumesState => {
    switch (action.type) {
        case FETCH_VOLUMES_START: return fetchVolumesStart(state, action);
        case FETCH_VOLUMES_SUCCESS: return fetchVolumesSuccess(state, action);
        case FETCH_VOLUMES_FAIL: return fetchVolumesFail(state, action);
        default: return state;
    }
};

export default reducer;
