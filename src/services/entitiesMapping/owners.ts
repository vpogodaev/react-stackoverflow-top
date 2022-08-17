import { IOwner } from '@entities/IOwner';
import { IStateOwner } from '@store/entities/IStateOwner';
import { IStackOwner } from '../entities/IStackOwner';

/* eslint-disable camelcase */
export const getOwner = (owner: IStackOwner | IStateOwner): IOwner => {
  if ('account_id' in owner) {
    const { reputation, display_name, account_id } = owner;

    return {
      accountId: account_id,
      displayName: display_name,
      reputation,
    };
  }

  return { ...owner };
};

export const getStateOwner = (owner: IStackOwner): IStateOwner => {
  return getOwner(owner);
};