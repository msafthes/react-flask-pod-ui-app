import { Image } from "../../models/Models";

export const FETCH_IMAGES_START = 'FETCH_IMAGES_START';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAIL = 'FETCH_IMAGES_FAIL';

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
