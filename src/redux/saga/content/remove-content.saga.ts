import { put, select, takeLatest, } from 'redux-saga/effects';
import { REMOVE_CONTENT } from '../../actions/actionTypes';
import { getContent } from "../../selectors/content.selector";
import { updateContentAction } from "../../actions/content.action";
import { removeChangesAction } from "../../actions/websocket";


export function* removeContentSaga(action: { start: number, length: number, type: string, syncWithServer: boolean, }) {
    const {start, length, syncWithServer} = action;

    // Updating changes at local
    const prevContent: string = yield select(getContent);

    let content = prevContent ?? "";

    content = content.substring(0, start) + content.substring(start + length);
    yield put(updateContentAction(content));

    if (syncWithServer) {
        // Sending changes to server
        yield put(removeChangesAction(start, length, content));
    }

}

export function* removeContentWatcherSaga() {
    yield takeLatest([REMOVE_CONTENT], removeContentSaga);
}
