import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Connection } from '../../models/Models';
import {
    FETCH_KEY_START, FETCH_KEY_SUCCESS, FETCH_KEY_FAIL,
    ADD_CONNECTION_START, ADD_CONNECTION_SUCCESS, ADD_CONNECTION_FAIL,
    REMOVE_CONNECTION_START, REMOVE_CONNECTION_SUCCESS, REMOVE_CONNECTION_FAIL,
    ACTIVATE_CONNECTION_START, ACTIVATE_CONNECTION_SUCCESS, ACTIVATE_CONNECTION_FAIL
} from './actionTypes';

import { API_BASE } from '../../config';


// CONNECTIONS

// Fetch Key
export const fetchKeyStart = () => {
    return {
        type: FETCH_KEY_START
    };
};

export const fetchKeySuccess = (sshKey: string) => {
    return {
        type: FETCH_KEY_SUCCESS,
        sshKey: sshKey
    };
};

export const fetchKeyFail = (error: string) => {
    return {
        type: FETCH_KEY_FAIL,
        error: error
    };
};

export const fetchKey = () => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(fetchKeyStart());

        const url = `${API_BASE}/connections/key`;

        const headers = {
            'Content-Type': 'application/json',
        }

        try {
            const response = await axios.get(url, { headers: headers });
            dispatch(fetchKeySuccess(response.data.sshKey));
        } catch (err) {
            err.response ?
                dispatch(fetchKeyFail(err.response.data))
                :
                dispatch(fetchKeyFail("Server does not respond while trying to fetch an ssh key."))
        }
    };
};

// Add Connection
export const addConnectionStart = () => {
    return {
        type: ADD_CONNECTION_START
    };
};

export const addConnectionSuccess = (connection: Connection) => {
    return {
        type: ADD_CONNECTION_SUCCESS,
        connection: connection
    };
};

export const addConnectionFail = (error: string) => {
    return {
        type: ADD_CONNECTION_FAIL,
        error: error
    };
};

export const addConnection = (connection: Connection) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(addConnectionStart());

        const url = `${API_BASE}/connections`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const data = {
            connection: connection
        }

        try {
            await axios.post(url, data, { headers: headers, });
            dispatch(addConnectionSuccess(connection));
        } catch (err) {
            err.response ?
                dispatch(addConnectionFail(err.response.data))
                :
                dispatch(addConnectionFail("Server does not respond while trying to add a connection."))
        }
    };
};

// Remove Connection
export const removeConnectionStart = () => {
    return {
        type: REMOVE_CONNECTION_START
    };
};

export const removeConnectionSuccess = (connection: Connection) => {
    return {
        type: REMOVE_CONNECTION_SUCCESS,
        connection: connection
    };
};

export const removeConnectionFail = (error: string) => {
    return {
        type: REMOVE_CONNECTION_FAIL,
        error: error
    };
};

export const removeConnection = (connection: Connection) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(removeConnectionStart());

        const url = `${API_BASE}/connections`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const data = {
            connection: connection
        }

        try {
            await axios.delete(url, { headers: headers, data, });
            dispatch(removeConnectionSuccess(connection));
        } catch (err) {
            err.response ?
                dispatch(removeConnectionFail(err.response.data))
                :
                dispatch(removeConnectionFail("Server does not respond while trying to remove a connection."))
        }
    };
};

// Activate Connection
export const activateConnectionStart = () => {
    return {
        type: ACTIVATE_CONNECTION_START
    };
};

export const activateConnectionSuccess = (connection: Connection) => {
    return {
        type: ACTIVATE_CONNECTION_SUCCESS,
        connection: connection
    };
};

export const activateConnectionFail = (error: string) => {
    return {
        type: ACTIVATE_CONNECTION_FAIL,
        error: error
    };
};

export const activateConnection = (connection: Connection) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        const activeUsername = connection.username;
        dispatch(activateConnectionStart());

        const url = `${API_BASE}/connections/activate`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Active-Username': activeUsername
        }

        const data = {
            connection: connection
        }

        if (activeUsername === "Local") {
            dispatch(activateConnectionSuccess(connection));
        } else {
            try {
                await axios.post(url, data, { headers: headers, });
                dispatch(activateConnectionSuccess(connection));
            } catch (err) {
                err.response ?
                    dispatch(activateConnectionFail(err.response.data))
                    :
                    dispatch(activateConnectionFail("Server does not respond while trying to activate a connection."))
            }
        }
    };
};
