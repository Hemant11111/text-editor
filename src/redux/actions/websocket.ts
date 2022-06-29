import { POST_CHANGES_SAGA, REMOVE_CHANGES_SAGA } from "./actionTypes";

export const postChangesAction = (index: number, changes: string, content: string) => ({
    type: POST_CHANGES_SAGA,
    index, content, changes
});


export const removeChangesAction = (start: number, length: number, content: string) => ({
    type: REMOVE_CHANGES_SAGA,
    start, length, content
});
