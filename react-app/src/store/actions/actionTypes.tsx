import { Image, Container, Volume, Connection } from "../../models/Models";

// See all available actions
// Images Action Types
export const FETCH_IMAGES_START = 'FETCH_IMAGES_START';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAIL = 'FETCH_IMAGES_FAIL';

export const REMOVE_IMAGES_START = 'REMOVE_IMAGES_START';
export const REMOVE_IMAGES_SUCCESS = 'REMOVE_IMAGES_SUCCESS';
export const REMOVE_IMAGES_FAIL = 'REMOVE_IMAGES_FAIL';

export const PRUNE_IMAGES_START = 'PRUNE_IMAGES_START';
export const PRUNE_IMAGES_SUCCESS = 'PRUNE_IMAGES_SUCCESS';
export const PRUNE_IMAGES_FAIL = 'PRUNE_IMAGES_FAIL';

export const PULL_IMAGE_START = 'PULL_IMAGE_START';
export const PULL_IMAGE_SUCCESS = 'PULL_IMAGE_SUCCESS';
export const PULL_IMAGE_FAIL = 'PULL_IMAGE_FAIL';

// Containers Action Types
export const FETCH_CONTAINERS_START = 'FETCH_CONTAINERS_START';
export const FETCH_CONTAINERS_SUCCESS = 'FETCH_CONTAINERS_SUCCESS';
export const FETCH_CONTAINERS_FAIL = 'FETCH_CONTAINERS_FAIL';

export const REMOVE_CONTAINERS_START = 'REMOVE_CONTAINERS_START';
export const REMOVE_CONTAINERS_SUCCESS = 'REMOVE_CONTAINERS_SUCCESS';
export const REMOVE_CONTAINERS_FAIL = 'REMOVE_CONTAINERS_FAIL';

export const UPDATE_CONTAINER_LOG = "UPDATE_CONTAINER_LOG";

export const CONTAINER_RUN_START = 'CONTAINER_RUN_START';
export const CONTAINER_RUN_SUCCESS = 'CONTAINER_RUN_SUCCESS';
export const CONTAINER_RUN_FAIL = 'CONTAINER_RUN_FAIL';

export const STOP_CONTAINERS_START = 'STOP_CONTAINERS_START';
export const STOP_CONTAINERS_SUCCESS = 'STOP_CONTAINERS_SUCCESS';
export const STOP_CONTAINERS_FAIL = 'STOP_CONTAINERS_FAIL';

export const KILL_CONTAINERS_START = 'KILL_CONTAINERS_START';
export const KILL_CONTAINERS_SUCCESS = 'KILL_CONTAINERS_SUCCESS';
export const KILL_CONTAINERS_FAIL = 'KILL_CONTAINERS_FAIL';

// Volumes Action Types
export const FETCH_VOLUMES_START = 'FETCH_VOLUMES_START';
export const FETCH_VOLUMES_SUCCESS = 'FETCH_VOLUMES_SUCCESS';
export const FETCH_VOLUMES_FAIL = 'FETCH_VOLUMES_FAIL';

export const CREATE_VOLUME_START = 'CREATE_VOLUME_START';
export const CREATE_VOLUME_SUCCESS = 'CREATE_VOLUME_SUCCESS';
export const CREATE_VOLUME_FAIL = 'CREATE_VOLUME_FAIL';

export const REMOVE_VOLUMES_START = 'REMOVE_VOLUMES_START';
export const REMOVE_VOLUMES_SUCCESS = 'REMOVE_VOLUMES_SUCCESS';
export const REMOVE_VOLUMES_FAIL = 'REMOVE_VOLUMES_FAIL';

// Connections Action Types
export const FETCH_KEY_START = 'FETCH_KEY_START';
export const FETCH_KEY_SUCCESS = 'FETCH_KEY_SUCCESS';
export const FETCH_KEY_FAIL = 'FETCH_KEY_FAIL';

export const ADD_CONNECTION_START = 'ADD_CONNECTION_START';
export const ADD_CONNECTION_SUCCESS = 'ADD_CONNECTION_SUCCESS';
export const ADD_CONNECTION_FAIL = 'ADD_CONNECTION_FAIL';

export const REMOVE_CONNECTION_START = 'REMOVE_CONNECTION_START';
export const REMOVE_CONNECTION_SUCCESS = 'REMOVE_CONNECTION_SUCCESS';
export const REMOVE_CONNECTION_FAIL = 'REMOVE_CONNECTION_FAIL';

export const ACTIVATE_CONNECTION_START = 'ACTIVATE_CONNECTION_START';
export const ACTIVATE_CONNECTION_SUCCESS = 'ACTIVATE_CONNECTION_SUCCESS';
export const ACTIVATE_CONNECTION_FAIL = 'ACTIVATE_CONNECTION_FAIL';


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

// Image Pull
export interface IPullImageStartAction {
    type: typeof PULL_IMAGE_START
}

export interface IPullImageSuccessAction {
    type: typeof PULL_IMAGE_SUCCESS,
    images: Image[]
}

export interface IPullImageFailAction {
    type: typeof PULL_IMAGE_FAIL,
    error: string
}

export type PullImageTypes = IPullImageStartAction | IPullImageSuccessAction | IPullImageFailAction;


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

// Container Run
export interface IContainerRunStartAction {
    type: typeof CONTAINER_RUN_START
}

export interface IContainerRunSuccessAction {
    type: typeof CONTAINER_RUN_SUCCESS,
    containers: Container[]
}

export interface IContainerRunFailAction {
    type: typeof CONTAINER_RUN_FAIL,
    error: string
}

export type ContainerRunTypes = IContainerRunStartAction | IContainerRunSuccessAction | IContainerRunFailAction;

// Containers Stop
export interface IStopContainersStartAction {
    type: typeof STOP_CONTAINERS_START
}

export interface IStopContainersSuccessAction {
    type: typeof STOP_CONTAINERS_SUCCESS,
    containers: Container[]
}

export interface IStopContainersFailAction {
    type: typeof STOP_CONTAINERS_FAIL,
    error: string
}

export type StopContainersTypes = IStopContainersStartAction | IStopContainersSuccessAction | IStopContainersFailAction;

// Containers Kill
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

// Volume Create
export interface ICreateVolumeStartAction {
    type: typeof CREATE_VOLUME_START
}

export interface ICreateVolumeSuccessAction {
    type: typeof CREATE_VOLUME_SUCCESS,
    volumes: Volume[]
}

export interface ICreateVolumeFailAction {
    type: typeof CREATE_VOLUME_FAIL,
    error: string
}

export type CreateVolumeTypes = ICreateVolumeStartAction | ICreateVolumeSuccessAction | ICreateVolumeFailAction;

// Volumes Remove
export interface IRemoveVolumesStartAction {
    type: typeof REMOVE_VOLUMES_START
}

export interface IRemoveVolumesSuccessAction {
    type: typeof REMOVE_VOLUMES_SUCCESS,
    volumes: Volume[]
}

export interface IRemoveVolumesFailAction {
    type: typeof REMOVE_VOLUMES_FAIL,
    error: string
}

export type RemoveVolumesTypes = IRemoveVolumesStartAction | IRemoveVolumesSuccessAction | IRemoveVolumesFailAction;

////////////////////////////////////////////////////////////////////////////////////////
// Connections State
export interface IConnectionsState {
    connections: Connection[],
    key: string,
    activeConnection: Connection,
    error: string,
    loading: boolean
}

// Key Fetch
export interface IFetchKeyStartAction {
    type: typeof FETCH_KEY_START
}

export interface IFetchKeySuccessAction {
    type: typeof FETCH_KEY_SUCCESS,
    key: string
}

export interface IFetchKeyFailAction {
    type: typeof FETCH_KEY_FAIL,
    error: string
}

export type FetchKeyTypes = IFetchKeyStartAction | IFetchKeySuccessAction | IFetchKeyFailAction;

// Connection Add
export interface IAddConnectionStartAction {
    type: typeof ADD_CONNECTION_START
}

export interface IAddConnectionSuccessAction {
    type: typeof ADD_CONNECTION_SUCCESS,
    connection: Connection
}

export interface IAddConnectionFailAction {
    type: typeof ADD_CONNECTION_FAIL,
    error: string
}

export type AddConnectionTypes = IAddConnectionStartAction | IAddConnectionSuccessAction | IAddConnectionFailAction;

// Connection Remove
export interface IRemoveConnectionStartAction {
    type: typeof REMOVE_CONNECTION_START
}

export interface IRemoveConnectionSuccessAction {
    type: typeof REMOVE_CONNECTION_SUCCESS,
    connection: Connection
}

export interface IRemoveConnectionFailAction {
    type: typeof REMOVE_CONNECTION_FAIL,
    error: string
}

export type RemoveConnectionTypes = IRemoveConnectionStartAction | IRemoveConnectionSuccessAction | IRemoveConnectionFailAction;

// Connection Activate
export interface IActivateConnectionStartAction {
    type: typeof ACTIVATE_CONNECTION_START
}

export interface IActivateConnectionSuccessAction {
    type: typeof ACTIVATE_CONNECTION_SUCCESS,
    connection: Connection
}

export interface IActivateConnectionFailAction {
    type: typeof ACTIVATE_CONNECTION_FAIL,
    error: string
}

export type ActivateConnectionTypes = IActivateConnectionStartAction | IActivateConnectionSuccessAction | IActivateConnectionFailAction;


////////////////////////////////////////////////////////////////////////////////////////
