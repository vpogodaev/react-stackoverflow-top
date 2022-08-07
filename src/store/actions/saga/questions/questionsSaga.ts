import { all, fork } from 'redux-saga/effects';
import { watchOnGetQuestions } from './getQuestionsSaga';

export default function* questionsSage() {
  yield all([fork(watchOnGetQuestions)]);
}