export interface IRepository {
  getMaxInterval(): Promise<QueryResult[]>;
  getMinInterval(): Promise<QueryResult[]>;
}

export type QueryResult = {
  producer: string;
  interval: number;
  years: string;
};
