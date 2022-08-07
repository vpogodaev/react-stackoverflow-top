import { RootState } from '../store';

export const selectQuestions = (state: RootState) => state.questions?.questions;