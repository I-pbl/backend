export class boardDto {
  readonly id: number;
  readonly title: string;
  readonly photo: string;
  readonly reservationStart: Date;
  readonly reservationEnd: Date;
  readonly credit: number;
  readonly content: string;
  readonly category: string;
  readonly area: string;
}

export class allBoardDto {
  readonly id: number;
  readonly title: string;
  readonly photo: string;
  readonly credit: number;
  readonly reservationStart: Date;
  readonly reservationEnd: Date;
  readonly category: string;
  readonly likes: number;
  readonly area: string;
}
