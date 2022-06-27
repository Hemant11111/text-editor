import { createSelector } from "reselect";
import { CONTENT_TYPE } from "../reducers/contentReducer";

export const getContentReducer: (store: any) => CONTENT_TYPE = (store: any) => {
    return store.contentReducer
};


export const getContent = createSelector(getContentReducer, data => data.content);
