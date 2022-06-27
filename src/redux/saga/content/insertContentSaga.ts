import { put, select, takeLatest, } from 'redux-saga/effects';
import { INSERT_CONTENT } from '../../actions/actionTypes';
import { getContent } from "../../selectors/content.selector";
import { updateContentAction } from "../../actions/content";
import { emitInsertChangesAction } from "../../actions/websocket";


export function* insertContentSaga(action: { index: number, text: string, syncWithServer: boolean, type: string }) {
    const {text, index, syncWithServer} = action;

    // Updating changes at local
    const prevContent: string = yield select(getContent);

    let content = prevContent ?? "";

    content = content.slice(0, index) + text + content.slice(index);

    yield put(updateContentAction(content));

    if (syncWithServer) {
        // Sending changes to server
        yield put(emitInsertChangesAction(index, text));
    }
}

export function* insertContentWatcherSaga() {
    yield takeLatest([INSERT_CONTENT], insertContentSaga);
}
