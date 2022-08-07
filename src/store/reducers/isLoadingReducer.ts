import { Action } from 'redux';

export type IsLoadingState = {
  [key: string]:  null | boolean;
}

const getLoadingMatches = (actionType: string) => /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(actionType);

export const isLoadingInitialState: IsLoadingState = {};

export const isLoadingReducer = (action: Action, state = isLoadingInitialState) => {
  const matches = getLoadingMatches(action?.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === 'REQUEST',
  };
};
