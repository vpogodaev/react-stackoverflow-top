import React, { FC } from 'react';
import { Questions } from '@components/Questions/Questions';
import { ArrowRight } from '@components/icons/ArrowRight';
import style from './TopQuestions.module.scss';

type TTopQuestionsProps = {};

const Header: FC = () => {
  return (
    <div>
      <h1>5 самых популярных вопросов на StackoverFlow, содержащих &quot;react-redux&quot; в наименовании, начиная
          с </h1>
      <input type="date" />
    </div>
  );
};

export const TopQuestions: FC<TTopQuestionsProps> = ({}) => {
  return (
    <main>
      <Header />
      <Questions />
    </main>
  );
};