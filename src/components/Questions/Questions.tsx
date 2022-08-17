import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useOnOutsideClick } from '@shared/hooks/useOnOutsideClick';
import { DroppableQuestion } from '@components/Questions/DroppableQuestion/DroppableQuestion';
import { selectQuestions } from '@store/selectors/questionsSelectors';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  changeQuestionPosition,
  changeQuestionScore,
  getQuestions,
  swapQuestions,
} from '@store/actions/actionCreators/questionsActionCreators';
import {
  selectDateFrom,
  selectTitle,
} from '@store/selectors/questionFiltersSelectors';
import style from './Questions.module.scss';

export const Questions: FC = () => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const questions = useAppSelector(selectQuestions);
  const dateFrom = useAppSelector(selectDateFrom);
  const title = useAppSelector(selectTitle);

  useEffect(() => {
    dispatch(getQuestions(dateFrom, title));
  }, []);

  const moveQuestion = useCallback(
    (dragIndex: number) => {
      const dragQuestion = questions[dragIndex];
      if (!dragQuestion) {
        return;
      }

      dispatch(changeQuestionPosition(dragQuestion.questionId, dragIndex));
    },
    [questions],
  );

  const [openedId, setOpenedId] = useState<null | number>(null);
  const [selectedId, setSelectedId] = useState<null | number>(null);

  useOnOutsideClick(ref, () => {
    setOpenedId(null);
    setSelectedId(null);
  });

  const handleQuestionClick = (id: number) => {
    if (openedId !== id) {
      setOpenedId(id);
    } else {
      setOpenedId(null);
    }
  };

  const handleQuestionDoubleClick = (id: number) => {
    if (!selectedId) {
      setSelectedId(id);
    } else if (selectedId !== id) {
      dispatch(swapQuestions(id, selectedId));
      setSelectedId(null);
    } else {
      setSelectedId(null);
    }
  };

  const handleScoreChange = (id: number, newScore: number) => {
    dispatch(changeQuestionScore(id, newScore));
  };

  const questionsToRender = questions.map((q) => {
    const selected = (() => {
      if (!selectedId) {
        return 'none';
      }
      return selectedId === q.questionId ? 'this' : 'other';
    })();

    return (
      <DroppableQuestion
        key={q.questionId}
        question={q}
        opened={openedId === q.questionId}
        selected={selected}
        onClick={() => handleQuestionClick(q.questionId)}
        onDoubleClick={() => handleQuestionDoubleClick(q.questionId)}
        onUpScoreClicked={() => handleScoreChange(q.questionId, q.score + 1)}
        onDownScoreClicked={() => handleScoreChange(q.questionId, q.score - 1)}
        moveQuestion={moveQuestion}
      />
    );
  });

  return (
    <div
      className={style.wrapper}
      ref={ref}
    >
      {questionsToRender}
    </div>
  );
};
