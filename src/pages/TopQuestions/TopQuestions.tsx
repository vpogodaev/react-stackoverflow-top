import React, { FC } from 'react';
import { Questions } from '@components/Questions/Questions';
import { Header } from '@pages/TopQuestions/Header/Header';
import style from './TopQuestions.module.scss';

export const TopQuestions: FC = () => {
  return (
    <main className={style.main}>
      <Header />
      <Questions />
    </main>
  );
};