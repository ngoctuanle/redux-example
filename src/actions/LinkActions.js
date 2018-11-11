import * as ActionTypes from '../constants/Actions';

export const getLinksRequest = (payload) => ({
    type: ActionTypes.GET_LINKS_REQUEST,
    payload
});

export const getLinksSuccess = (payload) => ({
    type: ActionTypes.GET_LINKS_SUCCESS,
    payload
});

export const getLinksFail = (payload) => ({
    type: ActionTypes.GET_LINKS_FAIL,
    payload
});

export const saveLink = (payload) => ({
    type: ActionTypes.SAVE_LINK,
    payload
});

export const removeLink = (payload) => ({
    type: ActionTypes.REMOVE_LINK,
    payload
});
