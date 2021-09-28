import  readLine  from 'readline';
import { CardCharacter } from './Interface.model';
class ValidateCardsState {
  constructor(playersCard: CardCharacter[], dealerCard: CardCharacter[]) {}
}

readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const hasAce = ([...listOfCards]: CardCharacter[]) => {
  if(!listOfCards.some((card) => card.value === 0)){
    return false;
  }
  else{
    //get user input whether to update the value of each ACE in deck to 1 or 11
    //update global variable in data.ts
  }
};
