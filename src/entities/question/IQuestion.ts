export interface IQuestion {
  questionId: number;
  title: string;
  score: number;
  isAnswered: boolean;
  creationDate: Date;
  viewCount: number;
  ownerName: string;
  ownerReputation: number;
}