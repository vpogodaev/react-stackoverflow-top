import React, { FC, MouseEventHandler, useMemo, MouseEvent, useRef, useEffect, useState, forwardRef } from 'react';
import { ArrowRight } from '@components/icons/ArrowRight';
import { IQuestion } from '@entities/question/IQuestion';
import style from './Question.module.scss';

type TQuestionProps = {
  question: IQuestion;
  opened: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
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

export const Question: FC<TQuestionProps> = ({ question, opened, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

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
    console.log('handleUpClick', question.questionId);
  };

  const handleDownClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    console.log('handleDownClick', question.questionId);
  };

  const handleQuestionClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log('handleQuestionClick', question.questionId);
    onClick(e);
  };

  const details = useMemo(() => (
    [
      {
        infoLabel: 'Имя создателя вопроса:',
        info: question.ownerName,
      }, {
      infoLabel: 'Рейтинг создателя вопроса:',
      info: question.ownerReputation.toString(),
    }, {
      infoLabel: 'Количество просмотров:',
      info: question.viewCount.toString(),
    },
    ]
  ), [question.questionId]);

  return (
    <div className={`${style.wrapper}${question.isAnswered ? ` ${style.correct}` : ''}`}>
      <div className={style.question}
           onClick={handleQuestionClick}>
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