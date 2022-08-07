type ErrorAction = {
  type: string;
  error: Error | string;
}

export type ErrorState = {
  [key: string]: null | Error | string;
}

const getErrorMatches = (actionType: string) =>
  /(.*)_(REQUEST|FAILURE|CLEAR_ERRORS)/.exec(actionType);

export const errorInitialState: ErrorState = {};

export const errorReducer = (action: ErrorAction, state = errorInitialState) => {
  const matches = getErrorMatches(action?.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === 'FAILURE' ? action.error : null,
  };
};
