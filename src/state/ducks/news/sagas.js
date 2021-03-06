import { all, call, cancel, fork, spawn, put, take } from 'redux-saga/effects';

import actions from './actions';
import types from './types';
import api from './api';

function* loadPage(page = null) {
  try {
    const { results, count } = yield call(api.getNews, page);
    yield put(actions.getNewsSuccess(results, count));
  } catch (error) {
    yield put(
      actions.getNewsFailed({
        errorMessage: error.message,
      }),
    );
  }
}

function* watchGetNews() {
  while (true) {
    const { payload: { page } } = yield take(types.GET_NEWS);
    const task = yield fork(loadPage, page);
    yield take([types.GET_NEWS_COMPLETED, types.GET_NEWS_FAILED]);
    if (task) {
      cancel(task);
    }
  }
}

function* monitorPagination() {
  while (true) {
    const { payload: { page } } = yield take(types.CHANGE_PAGE);
    yield put(actions.getNews(page));
  }
}

export default function* () {
  yield all([spawn(watchGetNews), spawn(monitorPagination)]);
}
