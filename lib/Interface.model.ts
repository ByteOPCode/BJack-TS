export interface CardCharacter {
  rank: string;
  cardType: string;
  value: string | number;
  Symbol: string;
}

export interface PlayerDesk {
  cards: CardCharacter[];
  hasAce?: Boolean;
  aceVal?: 1 | 11;
}
