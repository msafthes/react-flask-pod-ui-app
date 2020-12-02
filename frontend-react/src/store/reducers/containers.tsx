import {
    IContainersState,
    FETCH_CONTAINERS_START, FETCH_CONTAINERS_SUCCESS, FETCH_CONTAINERS_FAIL,
    IFetchContainersStartAction, IFetchContainersSuccessAction, IFetchContainersFailAction,
    FetchContainersTypes,
    KILL_CONTAINERS_START, KILL_CONTAINERS_SUCCESS, KILL_CONTAINERS_FAIL,
    IKillContainersStartAction, IKillContainersSuccessAction, IKillContainersFailAction,
    KillContainersTypes
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

// Kill
const killContainersStart = (state: IContainersState, action: IKillContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const killContainersSuccess = (state: IContainersState, action: IKillContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const killContainersFail = (state: IContainersState, action: IKillContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchContainersTypes | KillContainersTypes): IContainersState => {
    switch (action.type) {
        case FETCH_CONTAINERS_START: return fetchContainersStart(state, action);
        case FETCH_CONTAINERS_SUCCESS: return fetchContainersSuccess(state, action);
        case FETCH_CONTAINERS_FAIL: return fetchContainersFail(state, action);
        case KILL_CONTAINERS_START: return killContainersStart(state, action);
        case KILL_CONTAINERS_SUCCESS: return killContainersSuccess(state, action);
        case KILL_CONTAINERS_FAIL: return killContainersFail(state, action);
        default: return state;
    }
};

export default reducer;
