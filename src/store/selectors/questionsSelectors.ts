import { IQuestion } from '@entities/IQuestion';
import { getQuestion } from '@services/entitiesMapping/questions';
import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectQuestions = createSelector(
  (state: RootState) => state.questions,
  (state: RootState) => state.owners,
  (questions, owners) => {
    const selectedQuestions: IQuestion[] = [];

    questions?.allIds.forEach((id) => {
      const stateQuestion = questions?.byId[Number(id)];
      if (!stateQuestion) {
        return;
      }

      const owner = owners?.byId[stateQuestion?.ownerId];
      const question = getQuestion(stateQuestion, owner);

      if (question) {
        selectedQuestions.push(question);
      }
    });

    return selectedQuestions;
  },
);
