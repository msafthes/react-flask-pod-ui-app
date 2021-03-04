import {
    IContainersState,

    FETCH_CONTAINERS_START, FETCH_CONTAINERS_SUCCESS, FETCH_CONTAINERS_FAIL,
    IFetchContainersStartAction, IFetchContainersSuccessAction, IFetchContainersFailAction,
    FetchContainersTypes,

    REMOVE_CONTAINERS_START, REMOVE_CONTAINERS_SUCCESS, REMOVE_CONTAINERS_FAIL,
    IRemoveContainersStartAction, IRemoveContainersSuccessAction, IRemoveContainersFailAction,
    RemoveContainersTypes,

    STOP_CONTAINERS_START, STOP_CONTAINERS_SUCCESS, STOP_CONTAINERS_FAIL,
    IStopContainersStartAction, IStopContainersSuccessAction, IStopContainersFailAction,
    StopContainersTypes,

    KILL_CONTAINERS_START, KILL_CONTAINERS_SUCCESS, KILL_CONTAINERS_FAIL,
    IKillContainersStartAction, IKillContainersSuccessAction, IKillContainersFailAction,
    KillContainersTypes,

    UPDATE_CONTAINER_LOG, IUpdateContainerLogsAction,

    CONTAINER_RUN_START, CONTAINER_RUN_SUCCESS, CONTAINER_RUN_FAIL,
    IContainerRunStartAction, IContainerRunSuccessAction, IContainerRunFailAction,
    ContainerRunTypes,
} from '../actions/actionTypes';


const initialState: IContainersState = {
    containers: [],
    error: '',
    loading: false,
    containerLogs: [],
};

// Fetch Containers
const fetchContainersStart = (state: IContainersState, action: IFetchContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const fetchContainersSuccess = (state: IContainersState, action: IFetchContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const fetchContainersFail = (state: IContainersState, action: IFetchContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

// Remove Containers
const removeContainersStart = (state: IContainersState, action: IRemoveContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const removeContainersSuccess = (state: IContainersState, action: IRemoveContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const removeContainersFail = (state: IContainersState, action: IRemoveContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

// Stop Containers
const stopContainersStart = (state: IContainersState, action: IStopContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const stopContainersSuccess = (state: IContainersState, action: IStopContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const stopContainersFail = (state: IContainersState, action: IStopContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

// Kill Containers
const killContainersStart = (state: IContainersState, action: IKillContainersStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const killContainersSuccess = (state: IContainersState, action: IKillContainersSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const killContainersFail = (state: IContainersState, action: IKillContainersFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

// Update Logs
const updateContainerLogs = (state: IContainersState, action: IUpdateContainerLogsAction): IContainersState => {
    console.log(`REDUCER - updateContainerLogs`);
    return { ...state, containerLogs: action.containerLogs, loading: false }
};

// Container Run
const containerRunStart = (state: IContainersState, action: IContainerRunStartAction): IContainersState => {
    return { ...state, error: '', loading: true }
};

const containerRunSuccess = (state: IContainersState, action: IContainerRunSuccessAction): IContainersState => {
    return { ...state, containers: action.containers, error: '', loading: false }
};

const containerRunFail = (state: IContainersState, action: IContainerRunFailAction): IContainersState => {
    return { ...state, error: action.error, loading: false }
};

const reducer = (state = initialState, action: FetchContainersTypes | RemoveContainersTypes | IUpdateContainerLogsAction |
    ContainerRunTypes | StopContainersTypes | KillContainersTypes): IContainersState => {
    switch (action.type) {
        case FETCH_CONTAINERS_START: return fetchContainersStart(state, action);
        case FETCH_CONTAINERS_SUCCESS: return fetchContainersSuccess(state, action);
        case FETCH_CONTAINERS_FAIL: return fetchContainersFail(state, action);

        case REMOVE_CONTAINERS_START: return removeContainersStart(state, action);
        case REMOVE_CONTAINERS_SUCCESS: return removeContainersSuccess(state, action);
        case REMOVE_CONTAINERS_FAIL: return removeContainersFail(state, action);

        case STOP_CONTAINERS_START: return stopContainersStart(state, action);
        case STOP_CONTAINERS_SUCCESS: return stopContainersSuccess(state, action);
        case STOP_CONTAINERS_FAIL: return stopContainersFail(state, action);

        case KILL_CONTAINERS_START: return killContainersStart(state, action);
        case KILL_CONTAINERS_SUCCESS: return killContainersSuccess(state, action);
        case KILL_CONTAINERS_FAIL: return killContainersFail(state, action);

        case UPDATE_CONTAINER_LOG: return updateContainerLogs(state, action);

        case CONTAINER_RUN_START: return containerRunStart(state, action);
        case CONTAINER_RUN_SUCCESS: return containerRunSuccess(state, action);
        case CONTAINER_RUN_FAIL: return containerRunFail(state, action);

        default: return state;
    }
};

export default reducer;
