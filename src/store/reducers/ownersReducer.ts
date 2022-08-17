import { Reducer } from 'redux';
import { IStateOwner } from '../entities/IStateOwner';
import * as actions from '../actions/actionTypes/ownersActionTypes';
import { ByIdState } from '../helpers/ByIdState';
import { ById } from '../helpers/ById';

export type OwnersState = ByIdState<IStateOwner, number>;

export const ownersInitialState: OwnersState = {
  byId: {},
  allIds: [],
};

export const ownersReducer: Reducer<OwnersState, actions.OwnersAction> = (
  state = ownersInitialState,
  action: actions.OwnersAction,
) => {
  switch (action?.type) {
    case actions.SET_OWNERS: {
      const [byId, allIds] = action.owners.reduce(
        (pv, cv) => {
          pv[0][cv.accountId] = { ...cv };
          pv[1].push(cv.accountId);
          return pv;
        },
        [{}, []] as [ById<IStateOwner>, number[]],
      );

      return {
        ...state,
        byId,
        allIds,
      };
    }
    default:
      return state;
  }
};
