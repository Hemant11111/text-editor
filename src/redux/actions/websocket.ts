import { POST_CHANGES_SAGA, REMOVE_CHANGES_SAGA } from "./actionTypes";

export const emitInsertChangesAction = (index: number, content: string) => ({
    type: POST_CHANGES_SAGA,
    index, content
});


export const emitRemoveChangesAction = (start: number, length: number) => ({
    type: REMOVE_CHANGES_SAGA,
    start, length
});
