import { Reducer } from 'redux';
import produce from 'immer';
import { isEqual } from 'lodash';
import * as actions from '../actions/actionTypes/questionsActionTypes';
import { ByIdState } from '../helpers/ByIdState';
import { IStateQuestion } from '../entities/IStateQuestion';
import { ById } from '../helpers/ById';

export type QuestionsState = ByIdState<IStateQuestion, number>;

export const questionsInitialState: QuestionsState = {
  byId: {},
  allIds: [],
};

export const questionsReducer: Reducer<
  QuestionsState,
  actions.QuestionsAction
> = (state = questionsInitialState, action: actions.QuestionsAction) => {
  switch (action?.type) {
    case actions.GET_QUESTIONS:
    case actions.GET_QUESTIONS_REQUEST:
    case actions.GET_QUESTIONS_FAILURE:
      return state;
    case actions.GET_QUESTIONS_SUCCESS: {
      const [byId, allIds] = action.questions.reduce(
        (pv, cv) => {
          pv[0][cv.questionId] = { ...cv };
          pv[1].push(cv.questionId);
          return pv;
        },
        [{}, []] as [ById<IStateQuestion>, number[]],
      );

      return {
        ...state,
        byId,
        allIds,
      };
    }
    case actions.CHANGE_QUESTION_POSITION:
    case actions.SWAP_QUESTIONS: {
      const { question1Id, question2Id } = action;
      const allIds = [...state.allIds];

      const q1Index = allIds.indexOf(question1Id);
      const q2Index = allIds.indexOf(question2Id);

      [allIds[q1Index], allIds[q2Index]] = [allIds[q2Index], allIds[q1Index]];

      if (isEqual(allIds, state.allIds)) {
        return state;
      }

      return {
        ...state,
        allIds,
      };
    }
    case actions.CHANGE_QUESTION_SCORE: {
      const { questionId, score } = action;

      const question = { ...state.byId[questionId] };
      question.score = score;

      return produce(state, (draft) => {
        draft.byId[questionId].score = score;
      });
    }
    default:
      return state;
  }
};
