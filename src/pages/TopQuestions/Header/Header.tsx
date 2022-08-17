import React, { FC, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectDateFromTicks } from '@store/selectors/questionFiltersSelectors';
import { getQuestions } from '@store/actions/actionCreators/questionsActionCreators';
import 'react-datepicker/dist/react-datepicker.css';
import { dateTimeToTicks } from '@services/utils/dateTimeToTicks';
import style from './Header.module.scss';

export const Header: FC = () => {
  const currentDate = useAppSelector(selectDateFromTicks);
  const dispatch = useAppDispatch();

  const [dateFrom, setDateFrom] = useState(new Date(currentDate));

  const isBtnDisabled = useMemo(
    () => currentDate === dateFrom.getTime(),
    [dateFrom.getTime(), currentDate],
  );

  const handleDateChange = (date: Date) => {
    setDateFrom(date);
  };

  const handleSearchClicked = () => {
    dispatch(getQuestions(dateTimeToTicks(dateFrom)));
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
          className={`${style.btn}${
            isBtnDisabled ? ` ${style.disabled}` : ''
          } `}
          disabled={isBtnDisabled}
        >
          Поиск
        </button>
      </div>
    </div>
  );
};
