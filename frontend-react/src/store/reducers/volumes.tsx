import {
    IVolumesState,

    FETCH_VOLUMES_START, FETCH_VOLUMES_SUCCESS, FETCH_VOLUMES_FAIL,
    IFetchVolumesStartAction, IFetchVolumesSuccessAction, IFetchVolumesFailAction,
    FetchVolumesTypes,

    CREATE_VOLUME_START, CREATE_VOLUME_SUCCESS, CREATE_VOLUME_FAIL,
    ICreateVolumeStartAction, ICreateVolumeSuccessAction, ICreateVolumeFailAction,
    CreateVolumeTypes,

    REMOVE_VOLUMES_START, REMOVE_VOLUMES_SUCCESS, REMOVE_VOLUMES_FAIL,
    IRemoveVolumesStartAction, IRemoveVolumesSuccessAction, IRemoveVolumesFailAction,
    RemoveVolumesTypes,
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

// Create
const createVolumeStart = (state: IVolumesState, action: ICreateVolumeStartAction): IVolumesState => {
    return { ...state, error: '', loading: true }
};

const createVolumeSuccess = (state: IVolumesState, action: ICreateVolumeSuccessAction): IVolumesState => {
    return { ...state, volumes: action.volumes, error: '', loading: false }
};

const createVolumeFail = (state: IVolumesState, action: ICreateVolumeFailAction): IVolumesState => {
    return { ...state, error: action.error, loading: false }
};

// Remove
const removeVolumesStart = (state: IVolumesState, action: IRemoveVolumesStartAction): IVolumesState => {
    return { ...state, error: '', loading: true }
};

const removeVolumesSuccess = (state: IVolumesState, action: IRemoveVolumesSuccessAction): IVolumesState => {
    return { ...state, volumes: action.volumes, error: '', loading: false }
};

const removeVolumesFail = (state: IVolumesState, action: IRemoveVolumesFailAction): IVolumesState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchVolumesTypes | CreateVolumeTypes | RemoveVolumesTypes): IVolumesState => {
    switch (action.type) {
        case FETCH_VOLUMES_START: return fetchVolumesStart(state, action);
        case FETCH_VOLUMES_SUCCESS: return fetchVolumesSuccess(state, action);
        case FETCH_VOLUMES_FAIL: return fetchVolumesFail(state, action);

        case CREATE_VOLUME_START: return createVolumeStart(state, action);
        case CREATE_VOLUME_SUCCESS: return createVolumeSuccess(state, action);
        case CREATE_VOLUME_FAIL: return createVolumeFail(state, action);

        case REMOVE_VOLUMES_START: return removeVolumesStart(state, action);
        case REMOVE_VOLUMES_SUCCESS: return removeVolumesSuccess(state, action);
        case REMOVE_VOLUMES_FAIL: return removeVolumesFail(state, action);

        default: return state;
    }
};

export default reducer;
