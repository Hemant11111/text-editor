import { takeLatest, } from 'redux-saga/effects';
import { POST_CHANGES_SAGA, REMOVE_CHANGES_SAGA } from "../../actions/actionTypes";
import { WebSocketService } from "../../../service/network/webSocketService";


export function* postChangesSaga(action: { type: string, index: number, content: string, changes: string }) {

    const {index, content, changes} = action;

    const apiService = WebSocketService.getInstance();

    if (apiService.isConnected) {
        apiService.send(JSON.stringify({
            type: "INSERT",
            index,
            content,
            changes
        }));
    } else {
        console.error("********* Disconnected !!! ***********");
    }
}

export function* removeChangesSaga(action: { type: string, start: number, length: number, content: string }) {

    const {start, length, content} = action;

    const apiService = WebSocketService.getInstance();

    if (apiService.isConnected) {
        apiService.send(JSON.stringify({
            type: "REMOVE",
            start, length, content
        }));
    } else {
        console.error("********* Disconnected !!! ***********");
    }
}

export function* emitChangesWatcherSaga() {
    yield takeLatest([POST_CHANGES_SAGA], postChangesSaga);
    yield takeLatest([REMOVE_CHANGES_SAGA], removeChangesSaga);
}
