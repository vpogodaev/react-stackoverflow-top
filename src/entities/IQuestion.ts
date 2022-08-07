export interface IStackQuestion {
  question_id: number;
  title: string;
  score: number;
  is_answered: boolean;
  creation_date: number;
  view_count: number;
  owner: {
    display_name: string;
    reputation: number;
  };
}
