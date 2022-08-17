import * as actions from '../actionTypes/questionsActionTypes';
import { IStateQuestion } from '../../entities/IStateQuestion';

export const getQuestions = (
  dateFrom: number,
  title = 'react-redux',
): actions.GetQuestionsAction => ({
  type: actions.GET_QUESTIONS,
  title,
  dateFrom,
});

export const getQuestionsRequest = (): actions.GetQuestionsRequestAction => ({
  type: actions.GET_QUESTIONS_REQUEST,
});

export const getQuestionsSuccess = (
  questions: IStateQuestion[],
): actions.GetQuestionsSuccessAction => ({
  type: actions.GET_QUESTIONS_SUCCESS,
  questions,
});

export const getQuestionsFailure = (
  error: string,
): actions.GetQuestionsFailureAction => ({
  type: actions.GET_QUESTIONS_FAILURE,
  error,
});

export const swapQuestions = (
  question1Id: number,
  question2Id: number,
): actions.SwapQuestions => ({
  type: actions.SWAP_QUESTIONS,
  question1Id,
  question2Id,
});

export const changeQuestionScore = (
  questionId: number,
  score: number,
): actions.ChangeQuestionScore => ({
  type: actions.CHANGE_QUESTION_SCORE,
  questionId,
  score,
});

export const changeQuestionPosition = (
  question1Id: number,
  question2Id: number,
): actions.ChangeQuestionPosition => ({
  type: actions.CHANGE_QUESTION_POSITION,
  question1Id,
  question2Id,
});
