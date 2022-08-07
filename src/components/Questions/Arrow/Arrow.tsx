import React, { FC, MouseEventHandler } from 'react';
import { ArrowRight } from '@components/icons/ArrowRight';
import style from './Arrow.module.scss';

type TArrowProps = {
  direction: 'up' | 'down';
  onClick: MouseEventHandler<SVGSVGElement>;
}

export const Arrow: FC<TArrowProps> = ({ direction, onClick }) => {
  return (
    <ArrowRight className={`${style.arrow} ${style[direction]}`}
                role="button"
                onClick={onClick} />
  );
};
