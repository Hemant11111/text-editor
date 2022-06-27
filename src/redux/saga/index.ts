import { all } from 'redux-saga/effects';
import { insertContentWatcherSaga } from "./content/insertContentSaga";
import { loacContentWatcherSaga } from "./content/loadContentSaga";
import { removeContentWatcherSaga } from "./content/removeContentSaga";
import { emitChangesWatcherSaga } from "./api/apiSaga";


export default function* rootSaga() {
  yield all([
    insertContentWatcherSaga(),
    removeContentWatcherSaga(),
    loacContentWatcherSaga(),
    emitChangesWatcherSaga()
  ]);
}
