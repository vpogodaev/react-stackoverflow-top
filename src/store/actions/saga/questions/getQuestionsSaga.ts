import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchQuestions } from '@services/api/questionsApi';
import { getStateQuestion } from '@services/entitiesMapping/questions';
import { IStackQuestion } from '@services/entities/IStackQuestion';
import { IStateQuestion } from '@store/entities/IStateQuestion';
import { IStateOwner } from '@store/entities/IStateOwner';
import { getStateOwner } from '@services/entitiesMapping/owners';
import { setOwners } from '@store/actions/actionCreators/ownersActionCreators';
import {
  GET_QUESTIONS,
  GetQuestionsAction,
} from '../../actionTypes/questionsActionTypes';
import {
  getQuestionsFailure,
  getQuestionsRequest,
  getQuestionsSuccess,
} from '../../actionCreators/questionsActionCreators';
import {
  changeDateFrom,
  changeTitle,
} from '../../actionCreators/questionFiltersAcitonCreators';

function* onGetQuestions({ title, dateFrom }: GetQuestionsAction) {
  try {
    yield put(getQuestionsRequest());
    const { data } = yield call(fetchQuestions, title, dateFrom);
    const stateQuestions: IStateQuestion[] = [];
    const stateOwners: IStateOwner[] = [];
    (data.items as IStackQuestion[]).forEach((q) => {
      stateQuestions.push(getStateQuestion(q));
      stateOwners.push(getStateOwner(q.owner));
    });

    yield put(getQuestionsSuccess(stateQuestions));
    yield put(setOwners(stateOwners));
    yield put(changeDateFrom(dateFrom));
    yield put(changeTitle(title));
  } catch (e: any) {
    yield put(getQuestionsFailure(e.response.data.error));
  }
}

export function* watchOnGetQuestions() {
  yield takeEvery(GET_QUESTIONS, onGetQuestions);
}
