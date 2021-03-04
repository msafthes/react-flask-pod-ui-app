import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Volume } from '../../models/Models';
import {
    FETCH_VOLUMES_START, FETCH_VOLUMES_SUCCESS, FETCH_VOLUMES_FAIL,
    CREATE_VOLUME_START, CREATE_VOLUME_SUCCESS, CREATE_VOLUME_FAIL,
    REMOVE_VOLUMES_START, REMOVE_VOLUMES_SUCCESS, REMOVE_VOLUMES_FAIL,
} from './actionTypes';

import { API_BASE } from '../../config';


// VOLUMES

// Fetch
export const fetchVolumesStart = () => {
    return {
        type: FETCH_VOLUMES_START
    };
};

export const fetchVolumesSuccess = (volumes: Volume) => {
    return {
        type: FETCH_VOLUMES_SUCCESS,
        volumes: volumes
    };
};

export const fetchVolumesFail = (error: string) => {
    return {
        type: FETCH_VOLUMES_FAIL,
        error: error
    };
};

export const fetchVolumes = () => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(fetchVolumesStart());

        const url = `${API_BASE}/volumes`;

        const headers = {
            'Content-Type': 'application/json',
        }

        axios.get(url, { headers: headers })
            .then(response => {
                dispatch(fetchVolumesSuccess(response.data.volumes));
            })
            .catch(err => {
                err.response ?
                    dispatch(fetchVolumesFail(err.response.data))
                    :
                    dispatch(fetchVolumesFail("Server does not respond while trying to fetch volumes."))
            });
    };
};

// Create
export const createVolumeStart = () => {
    return {
        type: CREATE_VOLUME_START
    };
};

export const createVolumeSuccess = (volumes: Volume) => {
    return {
        type: CREATE_VOLUME_SUCCESS,
        volumes: volumes
    };
};

export const createVolumeFail = (error: string) => {
    return {
        type: CREATE_VOLUME_FAIL,
        error: error
    };
};

export const createVolume = (name: string) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        // console.log("createVolume()");
        dispatch(createVolumeStart());

        const url = `${API_BASE}/volumes/create`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const data = {
            name: name
        }

        axios.post(url, data, {
            headers: headers,
        }).then(response => {
            dispatch(createVolumeSuccess(response.data.volumes));
        }).catch(err => {
            err.response ?
                dispatch(createVolumeFail(err.response.data))
                :
                dispatch(createVolumeFail("Server does not respond while trying to create volumes."))

        });
    };
};

// Remove
export const removeVolumesStart = () => {
    return {
        type: REMOVE_VOLUMES_START
    };
};

export const removeVolumesSuccess = (volumes: Volume) => {
    return {
        type: REMOVE_VOLUMES_SUCCESS,
        volumes: volumes
    };
};

export const removeVolumesFail = (error: string) => {
    return {
        type: REMOVE_VOLUMES_FAIL,
        error: error
    };
};

export const removeVolumes = (names: string[]) => {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        // console.log("removeVolumes()");
        dispatch(removeVolumesStart());

        const url = `${API_BASE}/volumes`;

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        const data = {
            names: names
        }

        axios.delete(url, {
            headers: headers,
            data,
        }).then(response => {
            dispatch(removeVolumesSuccess(response.data.volumes));
        }).catch(err => {
            err.response ?
                dispatch(removeVolumesFail(err.response.data))
                :
                dispatch(removeVolumesFail("Server does not respond while trying to remove volumes."))

        });
    };
};
