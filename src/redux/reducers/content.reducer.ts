import { UPDATE_CONTENT, UNDO_CHANGES } from "../actions/actionTypes";

export type CONTENT_TYPE = {
    content: string,
    previousContents: string[]
}
const INITIAL_STATE: CONTENT_TYPE = {
    content: "",
    previousContents: []
};

const UNDO_LIMIT = 30;

const contentReducer = (state = INITIAL_STATE, action: any) => {
    let {content, previousContents} = state;
    switch (action.type) {
        case UPDATE_CONTENT:
            previousContents.push(content);
            if (previousContents.length > UNDO_LIMIT) {
                previousContents = previousContents.slice(UNDO_LIMIT * -1);
            }
            return {...state, content: action.content, previousContents};
        case UNDO_CHANGES:
            // TODO: create saga and sync undo changes as well.
            let prevChange = content;
            if (previousContents.length) {
                prevChange = previousContents.pop() ?? "";
            }
            return {...state, content: prevChange, previousContents};
        default:
            return state;
    }
};

export default contentReducer;
