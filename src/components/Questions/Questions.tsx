import React, { FC, useEffect, useRef, useState } from 'react';
import { useOnOutsideClick } from '@shared/hooks/useOnOutsideClick';
import { Question } from './Question/Question';
import style from './Questions.module.scss';
import { selectQuestions } from '../../store/selectors/questionsSelectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getQuestions } from '../../store/actions/actionCreators/questionActionCreators';
// import { useDrop } from 'react-dnd';
// import { draggableTypes } from '@shared/draggableTypes';

type TQuestionsProps = {};

export const Questions: FC<TQuestionsProps> = ({}) => {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQuestions(new Date(2018, 1, 1).getDate()));
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
    // if (!selectedIndex) {
    //   setSelectedIndex(index);
    // } else if (selectedIndex !== index) {
    //   //[questions[index], questions[selectedIndex]] = [questions[index], questions[selectedIndex]];
    // } else {
    //   setSelectedIndex(null);
    // }
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
                onDoubleClick={() => handleQuestionDoubleClick(q.question_id)} />
    );
  });

  return (
    <div className={style.wrapper}
         ref={ref}>
      {questionsToRender}
    </div>
  );
};