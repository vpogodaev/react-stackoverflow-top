import axios from 'axios';
import { IStackQuestion } from '@entities/IQuestion';

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
  const url = `https://api.stackexchange.com/2.3/search/advanced?page=1&pagesize=5&fromdate=${fromDate}&order=desc&sort=votes&title=${title}&site=stackoverflow&filter=!17mSOAXDuLawWadX3IsHQ-xdDHLtJH0OKu_J6hq(pno4Or`;

  return await axios.get(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};
