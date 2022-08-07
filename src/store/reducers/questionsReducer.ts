import { IStackQuestion } from '@entities/IQuestion';
import { Reducer } from 'redux';
import * as actions from '../actions/actionTypes/questionsActionTypes';
import { CHANGE_QUESTION_SCORE } from '../actions/actionTypes/questionsActionTypes';

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
    case actions.SWAP_QUESTIONS: {
      const { question1Id, question2Id } = action;
      const questions = [...state.questions];

      const question1Index = questions.findIndex(q => q.question_id === question1Id);
      const question2Index = questions.findIndex(q => q.question_id === question2Id);
      [questions[question1Index], questions[question2Index]] = [questions[question2Index], questions[question1Index]];

      return {
        ...state,
        questions: [...questions],
      };
    }
    case actions.CHANGE_QUESTION_SCORE: {
      const { questionId, score } = action;

      const questions = [...state.questions];
      const question = questions.find(q => q.question_id === questionId);
      if (question) {
        question.score = score;
      }

      return {
        ...state,
        questions: [...questions],
      };
    }
    default:
      return { ...state };
  }
};