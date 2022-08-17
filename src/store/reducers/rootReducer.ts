import { combineReducers } from 'redux';
import {
  questionsInitialState,
  questionsReducer,
  QuestionsState,
} from './questionsReducer';
import {
  ownersInitialState,
  ownersReducer,
  OwnersState,
} from './ownersReducer';
import {
  questionFiltersInitialState,
  questionFiltersReducer,
  QuestionFiltersState,
} from './questionFiltersReducer';

export type ApplicationState = {
  questions: QuestionsState;
  owners: OwnersState;
  questionFilters: QuestionFiltersState;
};

export const initialState: ApplicationState = {
  questions: questionsInitialState,
  owners: ownersInitialState,
  questionFilters: questionFiltersInitialState,
};

export const rootReducer = combineReducers({
  questions: questionsReducer,
  owners: ownersReducer,
  questionFilters: questionFiltersReducer,
});
