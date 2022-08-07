import React, { FC, MouseEventHandler, useMemo, MouseEvent, useRef, useEffect, useState } from 'react';
import { IStackQuestion } from '@entities/IQuestion';
import { useDrag } from 'react-dnd';
import { draggableTypes } from '@shared/draggableTypes';
import { Arrow } from '@components/Questions/Arrow/Arrow';
import { Details } from '@components/Questions/Details/Details';
import style from './Question.module.scss';

export type TQuestionProps = {
  question: IStackQuestion;
  opened: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onDoubleClick: MouseEventHandler<HTMLDivElement>;
  selected: 'this' | 'other' | 'none';
  onUpScoreClicked: MouseEventHandler<SVGSVGElement>;
  onDownScoreClicked: MouseEventHandler<SVGSVGElement>;
};

export const Question: FC<TQuestionProps> = ({
  question, opened, onClick, onDoubleClick, selected, onUpScoreClicked, onDownScoreClicked,
}) => {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const details = detailsRef?.current;
    let elHeight = details?.getBoundingClientRect().height || 0;

    if (elHeight && details) {
      const elStyle = window.getComputedStyle(details);
      const parse = (v: string) => parseInt(v, 10);
      elHeight += parse(elStyle.paddingTop)
                  + parse(elStyle.paddingBottom)
                  + parse(elStyle.marginTop)
                  + parse(elStyle.marginBottom);
    }
    if (opened) {
      setHeight(elHeight);
    } else {
      setHeight(0);
    }
  }, [opened]);

  const handleUpClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onUpScoreClicked(e);
  };

  const handleDownClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onDownScoreClicked(e);
  };

  const handleQuestionClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.detail === 1) {
      timer.current = setTimeout(() => {
        onClick(e);
      }, 200);
    }
  };

  const handleQuestionDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    onDoubleClick(e);
  };

  const details = useMemo(() => (
    [
      {
        infoLabel: 'Имя создателя вопроса:',
        info: question.owner.display_name,
      }, {
      infoLabel: 'Рейтинг создателя вопроса:',
      info: question.owner.reputation?.toString(),
    }, {
      infoLabel: 'Количество просмотров:',
      info: question.view_count?.toString(),
    },
    ]
  ), [question.question_id]);

  const [{ isDragging }, drag] = useDrag(() => (
    {
      type: draggableTypes.QUESTION,
      collect: (monitor) => (
        {
          isDragging: !!monitor.isDragging(),
        }
      ),
      item: question,
    }
  ));

  return (
    <div className={`${style.wrapper} ${style[selected]}${question.is_answered ? ` ${style.correct}` : ''}${isDragging ? ` ${style.dragging}` : ''}`}
         ref={drag}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={style.question}
           onClick={handleQuestionClick}
           onDoubleClick={handleQuestionDoubleClick}>
        <div className={style.title}
             title={question.title}>
          {question.title}
        </div>
        <div className={style.right}>
          <div className={style.score}>
            {question.score}
          </div>
          <div className={style.arrows}>
            <Arrow direction="up"
                   onClick={handleUpClick} />
            <Arrow direction="down"
                   onClick={handleDownClick} />
          </div>
        </div>
      </div>
      <div className={style.collapsable}
           style={{ height }}>
        <Details details={details}
                 ref={detailsRef} />
      </div>
    </div>
  );
};
