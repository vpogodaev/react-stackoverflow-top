import { IStateOwner } from '../../entities/IStateOwner';
import * as actions from '../actionTypes/ownersActionTypes';

export const setOwners = (owners: IStateOwner[]): actions.SetOwnersAction => ({
  type: actions.SET_OWNERS,
  owners,
});
