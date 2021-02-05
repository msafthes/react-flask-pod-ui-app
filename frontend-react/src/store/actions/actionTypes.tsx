import { Image, Container, Volume } from "../../models/Models";

// See all available actions
export const FETCH_IMAGES_START = 'FETCH_IMAGES_START';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAIL = 'FETCH_IMAGES_FAIL';

export const REMOVE_IMAGES_START = 'REMOVE_IMAGES_START';
export const REMOVE_IMAGES_SUCCESS = 'REMOVE_IMAGES_SUCCESS';
export const REMOVE_IMAGES_FAIL = 'REMOVE_IMAGES_FAIL';

export const PRUNE_IMAGES_START = 'PRUNE_IMAGES_START';
export const PRUNE_IMAGES_SUCCESS = 'PRUNE_IMAGES_SUCCESS';
export const PRUNE_IMAGES_FAIL = 'PRUNE_IMAGES_FAIL';

export const FETCH_CONTAINERS_START = 'FETCH_CONTAINERS_START';
export const FETCH_CONTAINERS_SUCCESS = 'FETCH_CONTAINERS_SUCCESS';
export const FETCH_CONTAINERS_FAIL = 'FETCH_CONTAINERS_FAIL';

export const REMOVE_CONTAINERS_START = 'REMOVE_CONTAINERS_START';
export const REMOVE_CONTAINERS_SUCCESS = 'REMOVE_CONTAINERS_SUCCESS';
export const REMOVE_CONTAINERS_FAIL = 'REMOVE_CONTAINERS_FAIL';

export const FETCH_VOLUMES_START = 'FETCH_VOLUMES_START';
export const FETCH_VOLUMES_SUCCESS = 'FETCH_VOLUMES_SUCCESS';
export const FETCH_VOLUMES_FAIL = 'FETCH_VOLUMES_FAIL';

export const UPDATE_CONTAINER_LOG = "UPDATE_CONTAINER_LOG";


////////////////////////////////////////////////////////////////////////////////////////
// Images State
export interface IImagesState {
    images: Image[],
    error: string,
    loading: boolean
}

// Images Fetch
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

// Images Remove
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

// Images Prune
export interface IPruneImagesStartAction {
    type: typeof PRUNE_IMAGES_START
}

export interface IPruneImagesSuccessAction {
    type: typeof PRUNE_IMAGES_SUCCESS,
    images: Image[]
}

export interface IPruneImagesFailAction {
    type: typeof PRUNE_IMAGES_FAIL,
    error: string
}

export type PruneImagesTypes = IPruneImagesStartAction | IPruneImagesSuccessAction | IPruneImagesFailAction;


////////////////////////////////////////////////////////////////////////////////////////
// Containers State
export interface IContainersState {
    containers: Container[],
    error: string,
    loading: boolean,
    containerLogs: any
}

// Containers Fetch
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

// Containers Remove
export interface IRemoveContainersStartAction {
    type: typeof REMOVE_CONTAINERS_START
}

export interface IRemoveContainersSuccessAction {
    type: typeof REMOVE_CONTAINERS_SUCCESS,
    containers: Container[]
}

export interface IRemoveContainersFailAction {
    type: typeof REMOVE_CONTAINERS_FAIL,
    error: string
}

export type RemoveContainersTypes = IRemoveContainersStartAction | IRemoveContainersSuccessAction | IRemoveContainersFailAction;

//  Container Log Update
export interface IUpdateContainerLogsAction {
    type: typeof UPDATE_CONTAINER_LOG,
    containerLogs: string
}


////////////////////////////////////////////////////////////////////////////////////////
// Volumes State
export interface IVolumesState {
    volumes: Volume[],
    error: string,
    loading: boolean
}

// Volumes Fetch
export interface IFetchVolumesStartAction {
    type: typeof FETCH_VOLUMES_START
}

export interface IFetchVolumesSuccessAction {
    type: typeof FETCH_VOLUMES_SUCCESS,
    volumes: Volume[]
}

export interface IFetchVolumesFailAction {
    type: typeof FETCH_VOLUMES_FAIL,
    error: string
}

export type FetchVolumesTypes = IFetchVolumesStartAction | IFetchVolumesSuccessAction | IFetchVolumesFailAction;


////////////////////////////////////////////////////////////////////////////////////////
