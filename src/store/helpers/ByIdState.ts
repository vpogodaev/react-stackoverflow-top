import { ById } from './ById';

export type ByIdState<T, IdType> = {
  byId: ById<T>;
  allIds: IdType[];
};
