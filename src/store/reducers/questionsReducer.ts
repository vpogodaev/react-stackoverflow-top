import { IStackQuestion } from '@entities/IQuestion';
import { Reducer } from 'redux';
import * as actions from '../actions/actionTypes/questionsActionTypes';

export type QuestionsState = {
  questions: IStackQuestion[];
}

export const questionsInitialState: QuestionsState = {
  questions: [],
};

export const questionsReducer: Reducer<QuestionsState, actions.QuestionsAction> = (
  state = questionsInitialState,
  action: actions.QuestionsAction,
) => {
  switch (action?.type) {
    case actions.GET_QUESTIONS:
    case actions.GET_QUESTIONS_REQUEST:
    case actions.GET_QUESTIONS_FAILURE:
      return {
        ...state,
      };
    case actions.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return { ...state };
  }
};