import axios from 'axios';
import { IStackQuestion } from '../entities/IStackQuestion';

interface IResponse {
  has_more: boolean;
  items: IStackQuestion[];
  quota_max: number;
  quota_remaining: number;
}

export const fetchQuestions = async (
  title: string,
  fromDate: number,
): Promise<IResponse> => {
  const url = `https://api.stackexchange.com/2.3/search/advanced?page=1&pagesize=5&fromdate=${fromDate}&order=desc&sort=votes&title=${title}&site=stackoverflow&filter=!OeuFycZBjhWIrxEZs7sZTwheLHMhez*unXRc8qysAbU`;

  return await axios.get(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};
