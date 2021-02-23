import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Volume } from '../../models/Models';
import {
    FETCH_VOLUMES_START, FETCH_VOLUMES_SUCCESS, FETCH_VOLUMES_FAIL,
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
                dispatch(fetchVolumesFail(err.response.data));
            });
    };
};
