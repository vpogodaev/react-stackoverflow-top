import { IStateOwner } from '../../entities/IStateOwner';

export const SET_OWNERS = 'ownersActionTypes/SET_OWNERS';
export type SetOwnersAction = {
  type: typeof SET_OWNERS;
  owners: IStateOwner[];
};

export type OwnersAction = SetOwnersAction;
