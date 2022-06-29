import { INSERT_CONTENT, LOAD_CONTENT, REMOVE_CONTENT, UNDO_CHANGES, UPDATE_CONTENT } from "./actionTypes";


export const insertContentAction = (text: string, index: number, syncWithServer = false) => ({
    type: INSERT_CONTENT,
    text, index, syncWithServer
});

export const updateContentAction = (content: string) => ({
    type: UPDATE_CONTENT,
    content
});

export const undoContentAction = () => ({
    type: UNDO_CHANGES
});

export const loadTextAction = (text: string, index: number) => ({
    type: LOAD_CONTENT,
    text, index
});

export const removeContentAction = (start: number, length: number, syncWithServer = false) => ({
    type: REMOVE_CONTENT,
    start,
    length, syncWithServer
});

