import { IStackQuestion } from '@entities/IQuestion';
import * as actions from '../actionTypes/questionsActionTypes';

export const getQuestions = (dateFrom: number, title = 'react-redux'): actions.GetQuestionsAction => (
  {
    type: actions.GET_QUESTIONS,
    title,
    dateFrom,
  }
);

export const getQuestionsRequest = (): actions.GetQuestionsRequestAction => (
  {
    type: actions.GET_QUESTIONS_REQUEST,
  }
);

export const getQuestionsSuccess = (questions: IStackQuestion[]) => (
  {
    type: actions.GET_QUESTIONS_SUCCESS,
    questions,
  }
);

export const getQuestionsFailure = (error: string) => (
  {
    type: actions.GET_QUESTIONS_FAILURE,
    error,
  }
);
