import { RootState } from '../store';

export const selectDateFrom = (state: RootState) =>
  state?.questionFilters?.dateFrom;
export const selectDateFromTicks = (state: RootState) => {
  if (state?.questionFilters?.dateFrom) {
    return state.questionFilters.dateFrom * 1000;
  }
  return state?.questionFilters?.dateFrom;
};
export const selectTitle = (state: RootState) => state?.questionFilters?.title;
