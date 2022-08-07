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

export type QuestionsAction =
  GetQuestionsAction
  | GetQuestionsRequestAction
  | GetQuestionsSuccessAction
  | GetQuestionsFailureAction;