export interface CardCharacter {
  rank: string;
  cardType: string;
  value: string | number;
  Symbol: string;
  isAceValAssigned?:boolean;
}

export interface PlayerDesk {
  cards: CardCharacter[];
  hasAce?: Boolean;
  
  totalCardVal?:number;
}
