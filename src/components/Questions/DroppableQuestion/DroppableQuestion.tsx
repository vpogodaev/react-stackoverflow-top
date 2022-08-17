import React, { FC } from 'react';
import {
  Question,
  TQuestionProps,
} from '@components/Questions/Question/Question';
import { draggableTypes } from '@shared/draggableTypes';
import { useDrop } from 'react-dnd';
import { IQuestion } from '@entities/IQuestion';
import { changeQuestionPosition } from '@store/actions/actionCreators/questionsActionCreators';
import { useAppDispatch } from '@store/hooks';

type TDroppableQuestionProps = {
  moveQuestion: (dragIndex: number) => void;
} & TQuestionProps;

export const DroppableQuestion: FC<TDroppableQuestionProps> = ({ ...rest }) => {
  const dispatch = useAppDispatch();

  const handleDrop = (questionId: number) => {
    dispatch(changeQuestionPosition(questionId, rest.question.questionId));
  };

  const [, drop] = useDrop(() => ({
    accept: draggableTypes.QUESTION,
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    hover: (q: IQuestion) => {
      if (!q) {
        return;
      }
      handleDrop(q.questionId)
    },
  }));

  return (
    <div ref={drop}>
      <Question {...rest} />
    </div>
  );
};
