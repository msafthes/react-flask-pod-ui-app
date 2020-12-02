import { Image, Container } from "../../models/Models";

export const FETCH_IMAGES_START = 'FETCH_IMAGES_START';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAIL = 'FETCH_IMAGES_FAIL';

export const REMOVE_IMAGES_START = 'REMOVE_IMAGES_START';
export const REMOVE_IMAGES_SUCCESS = 'REMOVE_IMAGES_SUCCESS';
export const REMOVE_IMAGES_FAIL = 'REMOVE_IMAGES_FAIL';

export const FETCH_CONTAINERS_START = 'FETCH_CONTAINERS_START';
export const FETCH_CONTAINERS_SUCCESS = 'FETCH_CONTAINERS_SUCCESS';
export const FETCH_CONTAINERS_FAIL = 'FETCH_CONTAINERS_FAIL';

export const KILL_CONTAINERS_START = 'KILL_CONTAINERS_START';
export const KILL_CONTAINERS_SUCCESS = 'KILL_CONTAINERS_SUCCESS';
export const KILL_CONTAINERS_FAIL = 'KILL_CONTAINERS_FAIL';

////////////////////////////////////////////
// Images

export interface IImagesState {
    images: Image[],
    error: string,
    loading: boolean
}

// Fetch
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

// Remove
export interface IRemoveImagesStartAction {
    type: typeof REMOVE_IMAGES_START
}

export interface IRemoveImagesSuccessAction {
    type: typeof REMOVE_IMAGES_SUCCESS,
    images: Image[]
}

export interface IRemoveImagesFailAction {
    type: typeof REMOVE_IMAGES_FAIL,
    error: string
}

export type RemoveImagesTypes = IRemoveImagesStartAction | IRemoveImagesSuccessAction | IRemoveImagesFailAction;

////////////////////////////////////////////
// Containers

export interface IContainersState {
    containers: Container[],
    error: string,
    loading: boolean
}

// Fetch
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

// Kill
export interface IKillContainersStartAction {
    type: typeof KILL_CONTAINERS_START
}

export interface IKillContainersSuccessAction {
    type: typeof KILL_CONTAINERS_SUCCESS,
    containers: Container[]
}

export interface IKillContainersFailAction {
    type: typeof KILL_CONTAINERS_FAIL,
    error: string
}

export type KillContainersTypes = IKillContainersStartAction | IKillContainersSuccessAction | IKillContainersFailAction;

////////////////////////////////////////////
