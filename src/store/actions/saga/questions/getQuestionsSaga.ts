import { put, call, takeEvery } from "redux-saga/effects";
import { GET_QUESTIONS, GetQuestionsAction } from '../../actionTypes/questionsActionTypes';
import {
  getQuestionsFailure,
  getQuestionsRequest,
  getQuestionsSuccess,
} from '../../actionCreators/questionActionCreators';
import { fetchQuestions } from '../../../../services/api/questionsApi';

function* onGetQuestions({title, dateFrom}: GetQuestionsAction) {
  try {
    yield put(getQuestionsRequest());
    const { data } = yield call(fetchQuestions, title, dateFrom);
    yield put(getQuestionsSuccess(data.items));
  } catch (e: any) {
    yield put(getQuestionsFailure(e.response.data.error));
  }
}

export function* watchOnGetQuestions() {
  yield takeEvery(GET_QUESTIONS, onGetQuestions);
}