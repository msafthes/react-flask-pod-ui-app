import { Image, Container } from "../../models/Models";

export const FETCH_IMAGES_START = 'FETCH_IMAGES_START';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAIL = 'FETCH_IMAGES_FAIL';

export const FETCH_CONTAINERS_START = 'FETCH_CONTAINERS_START';
export const FETCH_CONTAINERS_SUCCESS = 'FETCH_CONTAINERS_SUCCESS';
export const FETCH_CONTAINERS_FAIL = 'FETCH_CONTAINERS_FAIL';

////////////////////////////////////////////
// Images

export interface IImagesState {
    images: Image[],
    error: string,
    loading: boolean
}

export interface IFetchImagesStartAction {
    type: typeof FETCH_IMAGES_START
}

export interface IFetchImagesSuccessAction {
    type: typeof FETCH_IMAGES_SUCCESS,
    images: Image[]
}

export interface IFetchImagesFailAction {
    type: typeof FETCH_IMAGES_FAIL,
    error: string
}

export type FetchImagesTypes = IFetchImagesStartAction | IFetchImagesSuccessAction | IFetchImagesFailAction;

////////////////////////////////////////////
// Containers

export interface IContainersState {
    containers: Container[],
    error: string,
    loading: boolean
}

export interface IFetchContainersStartAction {
    type: typeof FETCH_CONTAINERS_START
}

export interface IFetchContainersSuccessAction {
    type: typeof FETCH_CONTAINERS_SUCCESS,
    containers: Container[]
}

export interface IFetchContainersFailAction {
    type: typeof FETCH_CONTAINERS_FAIL,
    error: string
}

export type FetchContainersTypes = IFetchContainersStartAction | IFetchContainersSuccessAction | IFetchContainersFailAction;

////////////////////////////////////////////
