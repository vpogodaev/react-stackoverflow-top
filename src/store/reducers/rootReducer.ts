import { combineReducers } from 'redux';
import {
  questionsInitialState,
  questionsReducer,
  QuestionsState,
} from './questionsReducer';

export type ApplicationState = {
  questions: QuestionsState;
};

export const initialState: ApplicationState = {
  questions: questionsInitialState,
};

export const rootReducer = combineReducers({
  questions: questionsReducer,
});
