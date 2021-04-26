import {
    IConnectionsState,

    FETCH_KEY_START, FETCH_KEY_SUCCESS, FETCH_KEY_FAIL,
    IFetchKeyStartAction, IFetchKeySuccessAction, IFetchKeyFailAction,
    FetchKeyTypes,

    ADD_CONNECTION_START, ADD_CONNECTION_SUCCESS, ADD_CONNECTION_FAIL,
    IAddConnectionStartAction, IAddConnectionSuccessAction, IAddConnectionFailAction,
    AddConnectionTypes,

    REMOVE_CONNECTION_START, REMOVE_CONNECTION_SUCCESS, REMOVE_CONNECTION_FAIL,
    IRemoveConnectionStartAction, IRemoveConnectionSuccessAction, IRemoveConnectionFailAction,
    RemoveConnectionTypes,

    ACTIVATE_CONNECTION_START, ACTIVATE_CONNECTION_SUCCESS, ACTIVATE_CONNECTION_FAIL,
    IActivateConnectionStartAction, IActivateConnectionSuccessAction, IActivateConnectionFailAction,
    ActivateConnectionTypes,
} from '../actions/actionTypes';

const initialState: IConnectionsState = {
    connections: [],
    activeConnection: { username: '', ip: '', podmanSocketPath: '' },
    sshKey: '',
    error: '',
    loading: false,
};

// Fetch
const fetchKeyStart = (state: IConnectionsState, action: IFetchKeyStartAction): IConnectionsState => {
    return { ...state, error: '', loading: true }
};

const fetchKeySuccess = (state: IConnectionsState, action: IFetchKeySuccessAction): IConnectionsState => {
    return { ...state, sshKey: action.sshKey, error: '', loading: false }
};

const fetchKeyFail = (state: IConnectionsState, action: IFetchKeyFailAction): IConnectionsState => {
    return { ...state, error: action.error, loading: false }
};

// Add
const addConnectionStart = (state: IConnectionsState, action: IAddConnectionStartAction): IConnectionsState => {
    return { ...state, error: '', loading: true }
};

const addConnectionSuccess = (state: IConnectionsState, action: IAddConnectionSuccessAction): IConnectionsState => {
    return {
        ...state, connections: [...state.connections, action.connection], error: '', loading: false,
    }
};

const addConnectionFail = (state: IConnectionsState, action: IAddConnectionFailAction): IConnectionsState => {
    return { ...state, error: action.error, loading: false }
};

// Remove
const removeConnectionStart = (state: IConnectionsState, action: IRemoveConnectionStartAction): IConnectionsState => {
    return { ...state, error: '', loading: true }
};

const removeConnectionSuccess = (state: IConnectionsState, action: IRemoveConnectionSuccessAction): IConnectionsState => {
    return {
        ...state,
        connections: state.connections.filter(connection => connection.username !== action.connection.username), error: '', loading: false,
        activeConnection: (state.activeConnection.username === action.connection.username && state.activeConnection.ip === action.connection.ip) ?
            { username: '', ip: '', podmanSocketPath: '' }
            :
            state.activeConnection
    }
};

const removeConnectionFail = (state: IConnectionsState, action: IRemoveConnectionFailAction): IConnectionsState => {
    return { ...state, error: action.error, loading: false }
};

// Activate
const activateConnectionStart = (state: IConnectionsState, action: IActivateConnectionStartAction): IConnectionsState => {
    return { ...state, error: '', loading: true }
};

const activateConnectionSuccess = (state: IConnectionsState, action: IActivateConnectionSuccessAction): IConnectionsState => {
    console.log("activateConnectionSuccess");
    console.log("action");
    console.log(action);
    return { ...state, activeConnection: action.connection }
};

const activateConnectionFail = (state: IConnectionsState, action: IActivateConnectionFailAction): IConnectionsState => {
    return { ...state, error: action.error, loading: false }
};

// REDUCER

const reducer = (state = initialState, action: FetchKeyTypes | AddConnectionTypes | RemoveConnectionTypes | ActivateConnectionTypes): IConnectionsState => {
    switch (action.type) {
        case FETCH_KEY_START: return fetchKeyStart(state, action);
        case FETCH_KEY_SUCCESS: return fetchKeySuccess(state, action);
        case FETCH_KEY_FAIL: return fetchKeyFail(state, action);

        case ADD_CONNECTION_START: return addConnectionStart(state, action);
        case ADD_CONNECTION_SUCCESS: return addConnectionSuccess(state, action);
        case ADD_CONNECTION_FAIL: return addConnectionFail(state, action);

        case REMOVE_CONNECTION_START: return removeConnectionStart(state, action);
        case REMOVE_CONNECTION_SUCCESS: return removeConnectionSuccess(state, action);
        case REMOVE_CONNECTION_FAIL: return removeConnectionFail(state, action);

        case ACTIVATE_CONNECTION_START: return activateConnectionStart(state, action);
        case ACTIVATE_CONNECTION_SUCCESS: return activateConnectionSuccess(state, action);
        case ACTIVATE_CONNECTION_FAIL: return activateConnectionFail(state, action);

        default: return state;
    }
};

export default reducer;
