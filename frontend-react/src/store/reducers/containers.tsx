import {
    IContainersState,
    FETCH_CONTAINERS_START, FETCH_CONTAINERS_SUCCESS, FETCH_CONTAINERS_FAIL,
    IFetchContainersStartAction, IFetchContainersSuccessAction, IFetchContainersFailAction,
    FetchContainersTypes,
    REMOVE_CONTAINERS_START, REMOVE_CONTAINERS_SUCCESS, REMOVE_CONTAINERS_FAIL,
    IRemoveContainersStartAction, IRemoveContainersSuccessAction, IRemoveContainersFailAction,
    RemoveContainersTypes
} from '../actions/actionTypes';


const initialState: IContainersState = {
    containers: [],
    error: '',
    loading: false,
};

// Fetch
const fetchContainersStart = (state: IContainersState, action: IFetchContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const fetchContainersSuccess = (state: IContainersState, action: IFetchContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const fetchContainersFail = (state: IContainersState, action: IFetchContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

// Remove
const removeContainersStart = (state: IContainersState, action: IRemoveContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const removeContainersSuccess = (state: IContainersState, action: IRemoveContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const removeContainersFail = (state: IContainersState, action: IRemoveContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchContainersTypes | RemoveContainersTypes): IContainersState => {
    switch (action.type) {
        case FETCH_CONTAINERS_START: return fetchContainersStart(state, action);
        case FETCH_CONTAINERS_SUCCESS: return fetchContainersSuccess(state, action);
        case FETCH_CONTAINERS_FAIL: return fetchContainersFail(state, action);
        case REMOVE_CONTAINERS_START: return removeContainersStart(state, action);
        case REMOVE_CONTAINERS_SUCCESS: return removeContainersSuccess(state, action);
        case REMOVE_CONTAINERS_FAIL: return removeContainersFail(state, action);
        default: return state;
    }
};

export default reducer;
