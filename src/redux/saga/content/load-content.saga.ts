import { takeLatest, } from 'redux-saga/effects';
import { LOAD_CONTENT } from '../../actions/actionTypes';


export function* loadContentSaga(action: any) {
}

export function* loacContentWatcherSaga() {
    yield takeLatest([LOAD_CONTENT], loadContentSaga);
}
