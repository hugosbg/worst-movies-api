export interface Producer {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface Ranked {
  min: Producer[];
  max: Producer[];
}
