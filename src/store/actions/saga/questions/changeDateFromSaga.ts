import { put, takeEvery } from 'redux-saga/effects';
import {
  CHANGE_DATE_FROM,
  ChangeDateFrom,
} from '../../actionTypes/questionsActionTypes';
import {
  getQuestions,
} from '../../actionCreators/questionActionCreators';

function* onChangeDateFrom({ newDate }: ChangeDateFrom) {
  yield put(getQuestions(newDate));
}

export function* watchOnChangeDateFrom() {
  yield takeEvery(CHANGE_DATE_FROM, onChangeDateFrom);
}