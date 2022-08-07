import React, { FC } from 'react';
import { Question, TQuestionProps } from '@components/Questions/Question/Question';
import { draggableTypes } from '@shared/draggableTypes';
import { useDrop } from 'react-dnd';
import { changeQuestionPosition } from '../../../store/actions/actionCreators/questionActionCreators';
import { useAppDispatch } from '../../../store/hooks';
import style from './DropableQuestion.module.scss';

type TDroppableQuestionProps = {
  moveQuestion: (dragIndex: number) => void;
} & TQuestionProps;

export const DroppableQuestion: FC<TDroppableQuestionProps> = ({ ...rest }) => {
  const dispatch = useAppDispatch();

  const handleDrop = (questionId: number) => {
    dispatch(changeQuestionPosition(questionId, rest.question.question_id));
  };

  const [, drop] = useDrop(() => (
    {
      accept: draggableTypes.QUESTION,
      drop: (q: any) => handleDrop(q?.question_id),
      collect: (monitor) => (
        { isOver: !!monitor.isOver() }
      ),
    }
  ));

  return <div ref={drop}><Question {...rest} /></div>;
};