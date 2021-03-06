import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Container } from '../../models/Models';
import {
    FETCH_CONTAINERS_START, FETCH_CONTAINERS_SUCCESS, FETCH_CONTAINERS_FAIL,
    REMOVE_CONTAINERS_START, REMOVE_CONTAINERS_SUCCESS, REMOVE_CONTAINERS_FAIL,
    STOP_CONTAINERS_START, STOP_CONTAINERS_SUCCESS, STOP_CONTAINERS_FAIL,
    KILL_CONTAINERS_START, KILL_CONTAINERS_SUCCESS, KILL_CONTAINERS_FAIL,
    UPDATE_CONTAINER_LOG,
    CONTAINER_RUN_START, CONTAINER_RUN_SUCCESS, CONTAINER_RUN_FAIL,
} from './actionTypes';

import { push } from 'connected-react-router';

import { API_BASE } from '../../config';


// CONTAINERS

// Fetch
export const fetchContainersStart = () => {
    return {
        type: FETCH_CONTAINERS_START
    };
};

export const fetchContainersSuccess = (containers: Container) => {
    return {
        type: FETCH_CONTAINERS_SUCCESS,
        containers: containers
    };
};

export const fetchContainersFail = (error: string) => {
    return {
        type: FETCH_CONTAINERS_FAIL,
        error: error
    };
};

export const fetchContainers = () => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(fetchContainersStart());

        const url = `${API_BASE}/containers`;

        const headers = {
            'Content-Type': 'application/json',
        }

        axios.get(url, { headers: headers })
            .then(response => {
                dispatch(fetchContainersSuccess(response.data.containers));
            })
            .catch(err => {
                err.response ?
                    dispatch(fetchContainersFail(err.response.data))
                    :
                    dispatch(fetchContainersFail("Server does not respond while trying to fetch containers."))
            });
    };
};

// Remove
export const removeContainersStart = () => {
    return {
        type: REMOVE_CONTAINERS_START
    };
};

export const removeContainersSuccess = (containers: Container) => {
    return {
        type: REMOVE_CONTAINERS_SUCCESS,
        containers: containers
    };
};

export const removeContainersFail = (error: string) => {
    return {
        type: REMOVE_CONTAINERS_FAIL,
        error: error
    };
};

export const removeContainers = (containerIds: Array<String>) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        // console.log("removeContainers()");
        dispatch(removeContainersStart());

        const url = `${API_BASE}/containers`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        axios.delete(url, {
            headers: headers,
            data: {
                IDs: containerIds
            }
        }).then(response => {
            dispatch(removeContainersSuccess(response.data.containers));
        }).catch(err => {
            err.response ?
                dispatch(removeContainersFail(err.response.data))
                :
                dispatch(removeContainersFail("Server does not respond while trying to remove containers."))
        });
    };
};

// Stop
export const stopContainersStart = () => {
    return {
        type: STOP_CONTAINERS_START
    };
};

export const stopContainersSuccess = (containers: Container) => {
    return {
        type: STOP_CONTAINERS_SUCCESS,
        containers: containers
    };
};

export const stopContainersFail = (error: string) => {
    return {
        type: STOP_CONTAINERS_FAIL,
        error: error
    };
};

export const stopContainers = (containerIds: Array<String>) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        // console.log("stopContainers()");
        dispatch(stopContainersStart());

        const url = `${API_BASE}/containers/stop`;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        const data = {
            IDs: containerIds
        }

        axios.post(url, data, {
            headers: headers,
        }).then(response => {
            dispatch(stopContainersSuccess(response.data.containers));
        }).catch(err => {
            err.response ?
                dispatch(stopContainersFail(err.response.data))
                :
                dispatch(stopContainersFail("Server does not respond while trying to stop containers."))
        });
    };
};

// Kill
export const killContainersStart = () => {
    return {
        type: KILL_CONTAINERS_START
    };
};

export const killContainersSuccess = (containers: Container) => {
    return {
        type: KILL_CONTAINERS_SUCCESS,
        containers: containers
    };
};

export const killContainersFail = (error: string) => {
    return {
        type: KILL_CONTAINERS_FAIL,
        error: error
    };
};

export const killContainers = (containerIds: Array<String>) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        // console.log("killContainers()");
        dispatch(killContainersStart());

        const url = `${API_BASE}/containers/kill`;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        const data = {
            IDs: containerIds
        }

        axios.post(url, data, {
            headers: headers,
        }).then(response => {
            dispatch(killContainersSuccess(response.data.containers));
        }).catch(err => {
            err.response ?
                dispatch(killContainersFail(err.response.data))
                :
                dispatch(killContainersFail("Server does not respond while trying to kill containers."))
        });
    };
};

// Update Container Log
export const updateContainerLogs = (containerLogs) => {
    return {
        type: UPDATE_CONTAINER_LOG,
        containerLogs: containerLogs
    }
}

// Container Run
export const containerRunStart = () => {
    return {
        type: CONTAINER_RUN_START
    };
};

export const containerRunSuccess = (containers: Container) => {
    return {
        type: CONTAINER_RUN_SUCCESS,
        containers: containers
    };
};

export const containerRunFail = (error: string) => {
    return {
        type: CONTAINER_RUN_FAIL,
        error: error
    };
};

export const containerRun = (command: String) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(containerRunStart());

        const url = `${API_BASE}/container-run`;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        const data = {
            command: command
        }

        axios.post(url, data, {
            headers: headers,
        }).then(response => {
            // -dt -p 8080:8080 --rm docker.io/library/alpine /bin/sh
            const parts = command.split(" ");

            parts.forEach(part => {
                response.data.containers.forEach(container => {
                    const image = container.image.split(":")[0];
                    // console.log(`part: ${part} | image: ${image} | ID: ${container.containerId} | imageRaw: ${container.image}`);

                    if (part === container.containerId || part === container.image || part === image) {
                        dispatch(push(`/container_logs/${container.containerId}`));
                    }
                });
            });
            dispatch(containerRunSuccess(response.data.containers));
        }).catch(err => {
            err.response ?
                dispatch(containerRunFail(err.response.data))
                :
                dispatch(containerRunFail("Server does not respond while trying to run container command."))
        });
    };
};