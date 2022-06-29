import { createSelector } from "reselect";
import { CONTENT_TYPE } from "../reducers/content.reducer";

export const getContentReducer: (store: any) => CONTENT_TYPE = (store: any) => {
    return store.contentReducer
};

export const getContent = createSelector(getContentReducer, data => data.content);
export const getPreviousContents = createSelector(getContentReducer, data => data.previousContents);
