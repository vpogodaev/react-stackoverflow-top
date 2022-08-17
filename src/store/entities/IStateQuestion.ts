export interface IStateQuestion {
  questionId: number;
  title: string;
  score: number;
  isAnswered: boolean;
  creationDate: number;
  viewCount: number;
  ownerId: number;
}
