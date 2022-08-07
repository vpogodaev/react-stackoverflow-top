import { all, fork } from 'redux-saga/effects';
import { watchOnGetQuestions } from './getQuestionsSaga';
import { watchOnChangeDateFrom } from './changeDateFromSaga';

export default function* questionsSage() {
  yield all([fork(watchOnGetQuestions), fork(watchOnChangeDateFrom)]);
}