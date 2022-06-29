import { all } from 'redux-saga/effects';
import { insertContentWatcherSaga } from "./content/insert-content.saga";
import { loacContentWatcherSaga } from "./content/load-content.saga";
import { removeContentWatcherSaga } from "./content/remove-content.saga";
import { emitChangesWatcherSaga } from "./api/api.saga";


export default function* rootSaga() {
  yield all([
    insertContentWatcherSaga(),
    removeContentWatcherSaga(),
    loacContentWatcherSaga(),
    emitChangesWatcherSaga()
  ]);
}
