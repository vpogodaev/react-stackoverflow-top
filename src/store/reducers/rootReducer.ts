import { combineReducers } from 'redux';
import { questionsInitialState, questionsReducer, QuestionsState } from './questionsReducer';
import { isLoadingInitialState, isLoadingReducer, IsLoadingState } from './isLoadingReducer';
import { errorInitialState, errorReducer, ErrorState } from './errorReducer';

export type ApplicationState = {
  // isLoading: IsLoadingState;
  // error: ErrorState;
  questions: QuestionsState;
}

export const initialState: ApplicationState = {
  // isLoading: isLoadingInitialState,
  // error: errorInitialState,
  questions: questionsInitialState,
};

export const rootReducer = combineReducers({
  // isLoading: isLoadingReducer,
  // error: errorReducer,
  questions: questionsReducer,
});
