import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Container } from '../../models/Models';
import {
    FETCH_CONTAINERS_START, FETCH_CONTAINERS_SUCCESS, FETCH_CONTAINERS_FAIL
} from './actionTypes';


// CONTAINERS
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

        const url = `http://127.0.0.1:5000/containers`;

        const headers = {
            'Content-Type': 'application/json',
        }

        axios.get(url, { headers: headers })
            .then(response => {
                dispatch(fetchContainersSuccess(response.data.containers));
            })
            .catch(err => {
                dispatch(fetchContainersFail(err.response.data));
            });
    };
};
