/* eslint-disable camelcase */
import { IQuestion } from '@entities/IQuestion';
import { IStateOwner } from '@store/entities/IStateOwner';
import { IStateQuestion } from '@store/entities/IStateQuestion';
import { IStackQuestion } from '../entities/IStackQuestion';
import { IStackOwner } from '../entities/IStackOwner';
import { getOwner } from './owners';

export const getQuestion = (
  question: IStackQuestion | IStateQuestion,
  qOwner?: IStackOwner | IStateOwner,
): IQuestion | null => {
  if ('question_id' in question) {
    const {
      question_id,
      score,
      title,
      owner,
      view_count,
      is_answered,
      creation_date,
    } = question;
    const mappedOwner = getOwner(owner);

    return {
      questionId: question_id,
      title,
      score,
      creationDate: creation_date,
      isAnswered: is_answered,
      viewCount: view_count,
      owner: mappedOwner,
    };
  }

  if (!qOwner) {
    return null;
  }
  const { questionId, isAnswered, score, creationDate, viewCount, title } =
    question;

  const mappedOwner = getOwner(qOwner);

  return {
    questionId,
    isAnswered,
    score,
    creationDate,
    viewCount,
    title,
    owner: mappedOwner,
  };
};

export const getStateQuestion = (question: IStackQuestion): IStateQuestion => {
  const {
    question_id,
    score,
    title,
    owner,
    view_count,
    is_answered,
    creation_date,
  } = question;

  return {
    questionId: question_id,
    title,
    score,
    creationDate: creation_date,
    isAnswered: is_answered,
    viewCount: view_count,
    ownerId: owner.account_id,
  };
};
