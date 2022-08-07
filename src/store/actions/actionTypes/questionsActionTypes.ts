import { IStackQuestion } from '@entities/IQuestion';

export const GET_QUESTIONS = 'questionsActionTypes/GET_QUESTIONS';
export type GetQuestionsAction = {
  type: typeof GET_QUESTIONS;
  title: string;
  dateFrom: number;
}

export const GET_QUESTIONS_REQUEST = 'questionsActionTypes/GET_QUESTIONS_REQUEST';
export type GetQuestionsRequestAction = {
  type: typeof GET_QUESTIONS_REQUEST;
}

export const GET_QUESTIONS_SUCCESS = 'questionsActionTypes/GET_QUESTIONS_SUCCESS';
export type GetQuestionsSuccessAction = {
  type: typeof GET_QUESTIONS_SUCCESS;
  questions: IStackQuestion[];
}

export const GET_QUESTIONS_FAILURE = 'questionsActionTypes/GET_QUESTIONS_FAILURE';
export type GetQuestionsFailureAction = {
  type: typeof GET_QUESTIONS_FAILURE;
  error: string;
}

export const SWAP_QUESTIONS = 'questionsActionTypes/SWAP_QUESTIONS';
export type SwapQuestions = {
  type: typeof SWAP_QUESTIONS;
  question1Id: number;
  question2Id: number;
}

export const CHANGE_QUESTION_SCORE = 'questionsActionTypes/CHANGE_QUESTION_SCORE';
export type ChangeQuestionScore = {
  type: typeof CHANGE_QUESTION_SCORE;
  questionId: number;
  score: number;
}

export type QuestionsAction =
  GetQuestionsAction
  | GetQuestionsRequestAction
  | GetQuestionsSuccessAction
  | GetQuestionsFailureAction
  | SwapQuestions
  | ChangeQuestionScore;