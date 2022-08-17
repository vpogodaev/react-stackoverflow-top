import { Reducer } from 'redux';
import { dateTimeToTicks } from '@services/utils/dateTimeToTicks';
import * as actions from '../actions/actionTypes/questionFiltersActionTypes';

export type QuestionFiltersState = {
  dateFrom: number;
  title: string;
};

export const questionFiltersInitialState: QuestionFiltersState = {
  dateFrom: dateTimeToTicks(new Date(2018, 0, 1)),
  title: 'react-redux',
};

export const questionFiltersReducer: Reducer<
  QuestionFiltersState,
  actions.QuestionFiltersAction
> = (
  state = questionFiltersInitialState,
  action: actions.QuestionFiltersAction,
) => {
  switch (action?.type) {
    case actions.CHANGE_DATE_FROM:
      return {
        ...state,
        dateFrom: action.dateFrom,
      };
    case actions.CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
};
