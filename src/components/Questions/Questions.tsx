import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useOnOutsideClick } from '@shared/hooks/useOnOutsideClick';
import { DroppableQuestion } from '@components/Questions/DroppableQuestion/DroppableQuestion';
import style from './Questions.module.scss';
import { selectDateFrom, selectQuestions, selectTitle } from '../../store/selectors/questionsSelectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeQuestionPosition,
  changeQuestionScore,
  getQuestions,
  swapQuestions,
} from '../../store/actions/actionCreators/questionActionCreators';

export const Questions: FC = () => {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  const dateFrom = useAppSelector(selectDateFrom);
  const title = useAppSelector(selectTitle);

  useEffect(() => {
    dispatch(getQuestions(dateFrom, title));
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  const moveQuestion = useCallback((dragIndex: number) => {
    const dragQuestion = questions[dragIndex];
    dispatch(changeQuestionPosition(dragQuestion.question_id, dragIndex));
  }, [questions]);

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

  const questionsToRender = questions.map((q, i) => {
    const selected = (
      () => {
        if (!selectedId) {
          return 'none';
        }
        return selectedId === q.question_id ? 'this' : 'other';
      }
    )();

    return (
      <DroppableQuestion key={q.question_id}
                         question={q}
                         opened={openedId === q.question_id}
                         selected={selected}
                         onClick={() => handleQuestionClick(q.question_id)}
                         onDoubleClick={() => handleQuestionDoubleClick(q.question_id)}
                         onUpScoreClicked={() => handleScoreChange(q.question_id, q.score + 1)}
                         onDownScoreClicked={() => handleScoreChange(q.question_id, q.score - 1)}
                         moveQuestion={moveQuestion} />
    );
  });

  return (
    <div className={style.wrapper}
         ref={ref}>
      {questionsToRender}
    </div>
  );
};