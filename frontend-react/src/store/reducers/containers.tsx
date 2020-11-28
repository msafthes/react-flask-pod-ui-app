import {
    IContainersState,
    FETCH_CONTAINERS_START, FETCH_CONTAINERS_SUCCESS, FETCH_CONTAINERS_FAIL,
    IFetchContainersStartAction, IFetchContainersSuccessAction, IFetchContainersFailAction,
    FetchContainersTypes
} from '../actions/actionTypes';


const initialState: IContainersState = {
    containers: [],
    error: '',
    loading: false,
};

const fetchContainersStart = (state: IContainersState, action: IFetchContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const fetchContainersSuccess = (state: IContainersState, action: IFetchContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const fetchContainersFail = (state: IContainersState, action: IFetchContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchContainersTypes): IContainersState => {
    switch (action.type) {
        case FETCH_CONTAINERS_START: return fetchContainersStart(state, action);
        case FETCH_CONTAINERS_SUCCESS: return fetchContainersSuccess(state, action);
        case FETCH_CONTAINERS_FAIL: return fetchContainersFail(state, action);
        default: return state;
    }
};

export default reducer;
