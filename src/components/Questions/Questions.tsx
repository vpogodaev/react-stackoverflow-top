import React, { FC, useRef, useState } from 'react';
import { IQuestion } from '@entities/question/IQuestion';
import { useOnOutsideClick } from '@shared/hooks/useOnOutsideClick';
import { Question } from './Question/Question';
import style from './Questions.module.scss';

type TQuestionsProps = {};

export const Questions: FC<TQuestionsProps> = ({}) => {
  const questions: IQuestion[] = [
    {
      questionId: 1,
      title: 'React-redux is awesome, isn\'t it?',
      creationDate: new Date(),
      isAnswered: true,
      score: 100500,
      viewCount: 1000,
      ownerName: 'Some name',
      ownerReputation: 1432,
    },
    {
      questionId: 2,
      title: 'React-redux connect() fails to pass the props',
      creationDate: new Date(),
      isAnswered: false,
      score: 5,
      viewCount: 1000,
      ownerName: 'Some name',
      ownerReputation: 1432,
    },
    {
      questionId: 3,
      title: 'How does foreach works in react-redux',
      creationDate: new Date(),
      isAnswered: false,
      score: 3,
      viewCount: 1000,
      ownerName: 'Some name',
      ownerReputation: 1432,
    },
    {
      questionId: 4,
      title: 'React-Redux Why does specific component update, when its sibling\'s child component something',
      creationDate: new Date(),
      isAnswered: true,
      score: 3,
      viewCount: 1000,
      ownerName: 'Some name',
      ownerReputation: 1432,
    },
    {
      questionId: 5,
      title: 'How to update/merge array values in React-Redux correctly',
      creationDate: new Date(),
      isAnswered: false,
      score: 2,
      viewCount: 1000,
      ownerName: 'Some name',
      ownerReputation: 1432,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [openedId, setOpenedId] = useState<null | number>(1);

  useOnOutsideClick(ref, () => {
    setOpenedId(null);
  });


  const questionsToRender = questions.map(q => (
    <Question key={q.questionId}
              question={q}
              opened={openedId === q.questionId}
              onClick={() => {
                if (openedId !== q.questionId) {
                  setOpenedId(q.questionId);
                } else {
                  setOpenedId(null);
                }
              }} />
  ));

  return (
    <div className={style.wrapper}
         ref={ref}>
      {questionsToRender}
    </div>
  );
};