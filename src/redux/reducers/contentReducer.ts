import { UPDATE_CONTENT } from "../actions/actionTypes";

export type CONTENT_TYPE = {
    content: string
}
const INITIAL_STATE: CONTENT_TYPE = {
    content: ""
};


const contentReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_CONTENT:
            return {...state, content: action.content};
        default:
            return state;
    }
};

export default contentReducer;
