import React, { FC, useEffect, useRef, useState } from 'react';
import { useOnOutsideClick } from '@shared/hooks/useOnOutsideClick';
import { Question } from './Question/Question';
import style from './Questions.module.scss';
import { selectDateFrom, selectQuestions, selectTitle } from '../../store/selectors/questionsSelectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeQuestionScore,
  getQuestions,
  swapQuestions,
} from '../../store/actions/actionCreators/questionActionCreators';
// import { useDrop } from 'react-dnd';
// import { draggableTypes } from '@shared/draggableTypes';

type TQuestionsProps = {};

export const Questions: FC<TQuestionsProps> = ({}) => {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  const dateFrom = useAppSelector(selectDateFrom);
  const title = useAppSelector(selectTitle);

  useEffect(() => {
    dispatch(getQuestions(dateFrom, title));
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  // const [, drop] = useDrop(()=>(
  //   {
  //     accept: draggableTypes.QUESTION,
  //     drop: () =>
  //   }
  // ));

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

  const questionsToRender = questions.map(q => {
    const selected = (
      () => {
        if (!selectedId) {
          return 'none';
        }
        return selectedId === q.question_id ? 'this' : 'other';
      }
    )();

    return (
      <Question key={q.question_id}
                question={q}
                opened={openedId === q.question_id}
                selected={selected}
                onClick={() => handleQuestionClick(q.question_id)}
                onDoubleClick={() => handleQuestionDoubleClick(q.question_id)}
                onUpScoreClicked={() => handleScoreChange(q.question_id, q.score + 1)}
                onDownScoreClicked={() => handleScoreChange(q.question_id, q.score - 1)} />
    );
  });

  return (
    <div className={style.wrapper}
         ref={ref}>
      {questionsToRender}
    </div>
  );
};