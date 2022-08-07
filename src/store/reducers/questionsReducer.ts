import { IStackQuestion } from '@entities/IQuestion';
import { Reducer } from 'redux';
import * as actions from '../actions/actionTypes/questionsActionTypes';

export type QuestionsState = {
  questions: IStackQuestion[];
  dateFrom: number;
  title: string;
}

export const questionsInitialState: QuestionsState = {
  questions: [],
  dateFrom: new Date(2018, 0, 1).getTime() / 1000,
  title: 'react-redux',
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
    case actions.CHANGE_DATE_FROM:
      return {
        ...state,
        dateFrom: action.newDate,
      };
    case actions.CHANGE_QUESTION_POSITION: {
      const { questionId, otherQuestionIndex } = action;
      const { questions } = state;
      const oldIndex = questions.findIndex(q => q.question_id === questionId);
      const newIndex = questions.findIndex(q => q.question_id === otherQuestionIndex);
      const question = questions[oldIndex];

      const newQuestions = [...questions.slice(0, oldIndex), ...questions.slice(oldIndex + 1)];
      const newQuestions2 = [...newQuestions.slice(0, newIndex), question, ...newQuestions.slice(newIndex)];

      return {
        ...state,
        questions: newQuestions2,
      };
    }
    default:
      return { ...state };
  }
};