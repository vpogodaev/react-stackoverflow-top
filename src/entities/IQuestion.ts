import { IOwner } from '@entities/IOwner';

export interface IQuestion {
  questionId: number;
  title: string;
  score: number;
  isAnswered: boolean;
  creationDate: number;
  viewCount: number;
  owner: IOwner;
}
