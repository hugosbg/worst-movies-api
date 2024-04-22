export interface Movie {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: Winner;
}

export interface MovieWithId extends Movie {
  id: number;
}

export enum Winner {
  yes = 'yes',
  no = 'no',
}
