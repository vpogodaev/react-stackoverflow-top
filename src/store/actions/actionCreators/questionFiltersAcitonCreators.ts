import * as actions from '../actionTypes/questionFiltersActionTypes';

export const changeDateFrom = (dateFrom: number): actions.ChangeDateFrom => ({
  type: actions.CHANGE_DATE_FROM,
  dateFrom,
});

export const changeTitle = (title: string): actions.ChangeTitle => ({
  type: actions.CHANGE_TITLE,
  title,
});