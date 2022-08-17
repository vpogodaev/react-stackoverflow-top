export const CHANGE_DATE_FROM = 'questionFiltersActionTypes/CHANGE_DATE_FROM';
export type ChangeDateFrom = {
  type: typeof CHANGE_DATE_FROM;
  dateFrom: number;
};

export const CHANGE_TITLE = 'questionFiltersActionTypes/CHANGE_TITLE';
export type ChangeTitle = {
  type: typeof CHANGE_TITLE;
  title: string;
};

export type QuestionFiltersAction = ChangeDateFrom | ChangeTitle;