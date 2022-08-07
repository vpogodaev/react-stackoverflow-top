import { RootState } from '../store';

export const selectQuestions = (state: RootState) => state.questions?.questions;
export const selectDateFrom = (state: RootState) => state.questions?.dateFrom;
export const selectDateFromTicks = (state: RootState) => {
  if (state.questions?.dateFrom) {
    return state.questions.dateFrom * 1000;
  }
  return state.questions?.dateFrom;
};
export const selectTitle = (state: RootState) => state.questions?.title;
