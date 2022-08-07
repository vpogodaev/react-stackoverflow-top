import React, { FC, forwardRef } from 'react';
import style from './Details.module.scss';

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

export const Details = forwardRef<HTMLDivElement, TDetailsProps>(({ details }, ref) => {
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