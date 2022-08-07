import React, { FC, MouseEventHandler, useMemo, MouseEvent, useRef, useEffect, useState, forwardRef } from 'react';
import { ArrowRight } from '@components/icons/ArrowRight';
import { IStackQuestion } from '@entities/IQuestion';
import style from './Question.module.scss';

type TQuestionProps = {
  question: IStackQuestion;
  opened: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onDoubleClick: MouseEventHandler<HTMLDivElement>;
  selected: 'this' | 'other' | 'none';
};

type TArrowProps = {
  direction: 'up' | 'down';
  onClick: MouseEventHandler<SVGSVGElement>;
}

const Arrow: FC<TArrowProps> = ({ direction, onClick }) => {
  return (
    <ArrowRight className={`${style.arrow} ${style[direction]}`}
                role="button"
                onClick={onClick} />
  );
};

type TDetailsItemProps = {
  infoLabel: string;
  info: string;
}

const DetailsItem: FC<TDetailsItemProps> = ({ infoLabel, info }) => {
  return (
    <div className={style.info}>
      <span>{infoLabel}</span>
      <span>{info}</span>
    </div>
  );
};

type TDetailsProps = {
  details: TDetailsItemProps[];
}

const Details = forwardRef<HTMLDivElement, TDetailsProps>(({ details }, ref) => {
  const items = details.map((d, i) => (
    <DetailsItem key={i}
                 infoLabel={d.infoLabel}
                 info={d.info} />
  ));

  return (
    <div className={`${style.details}`}
         ref={ref}>
      {items}
    </div>
  );

});

export const Question: FC<TQuestionProps> = ({ question, opened, onClick, onDoubleClick, selected }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const details = ref?.current;
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
    console.log('handleUpClick', question.question_id);
  };

  const handleDownClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    console.log('handleDownClick', question.question_id);
  };

  const handleQuestionClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.detail === 1) {
      timer.current = setTimeout(() => {
        console.log('handleQuestionClick', e.detail);
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
      info: question.owner.reputation.toString(),
    }, {
      infoLabel: 'Количество просмотров:',
      info: question.view_count.toString(),
    },
    ]
  ), [question.question_id]);

  // const [{ isDragging }, drag] = useDrag(() => (
  //   {
  //     type: draggableTypes.QUESTION,
  //     collect: (monitor) => (
  //       {
  //         isDragging: !!monitor.isDragging(),
  //       }
  //     ),
  //   }
  // ));
  // ${isDragging ? ` ${style.dragging}` : ''}
  // ref={drag}

  return (
    <div className={`${style.wrapper} ${style[selected]}${question.is_answered ? ` ${style.correct}` : ''}`}>
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
                 ref={ref} />
      </div>
    </div>
  );
};