import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectDateFromTicks } from '@store/selectors/questionFiltersSelectors';
import { getQuestions } from '@store/actions/actionCreators/questionsActionCreators';
import style from './Header.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

export const Header: FC = () => {
  const currentDate = useAppSelector(selectDateFromTicks);
  const dispatch = useAppDispatch();

  const [dateFrom, setDateFrom] = useState(new Date(currentDate));

  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleDateChange = (date: Date) => {
    setDateFrom(date);
    if (currentDate !== date.getTime()) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleSearchClicked = () => {
    dispatch(getQuestions((dateFrom.getTime() / 1000)));
    setBtnDisabled(true);
  };

  return (
    <div className={style.header}>
      <span className={style.text}>
        5 самых популярных вопросов на StackoverFlow, содержащих
        &quot;react-redux&quot; в наименовании, начиная с{' '}
      </span>
      <div className={style.config}>
        <DatePicker
          selected={dateFrom}
          onChange={handleDateChange}
        />
        <button
          type="button"
          onClick={handleSearchClicked}
          className={`${style.btn}${btnDisabled ? ` ${style.disabled}` : ''} `}
          disabled={btnDisabled}
        >
          Поиск
        </button>
      </div>
    </div>
  );
};
