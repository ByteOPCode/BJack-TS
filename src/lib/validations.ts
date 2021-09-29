
import inquirer from 'inquirer';
import { CardCharacter } from '../model/Interface.model';
class ValidateCardsState {
  constructor(playersCard: CardCharacter[], dealerCard: CardCharacter[]) {}
}

const rulesList = {} as any;

function accumulator(cardsList: CardCharacter[]) {
  const totalCardCounter = cardsList
    .map((cards: CardCharacter) => Number(cards.value))
    .reduce((acc: number, current: number) => acc + current, 0);
  return totalCardCounter;
}

const evaluateAce = ([...listOfCards]: CardCharacter[]) => {
  if (!listOfCards.some((card) => card.value === 11)) {
    return listOfCards;
  } else {
    let [cardListWithoutAce, cardswithAce] = [
      listOfCards.filter((cards) => cards.value !== 11),
      listOfCards.filter((cards) => cards.value === 11)
    ];

    if (cardswithAce.length) {
      // console.log(`Your total without accounting Ace is  ${accumulator(cardListWithoutAce)} and have ${cardswithAce.length} Ace Card${cardswithAce.length>1?'s':''}` )
      const updatedAceCards = cardswithAce.map((card) => {
      
        setTimeout(function(){  inquirer
          .prompt([
            {
              type: 'list',
              name: 'value',
              message: `What do you want to do with ${card.Symbol}`,
              choices: ['1', '11'],
              
              filter(val) {
                return Number(val);
              }
            }
          ])
          .then((answers) => {
            card.value = answers.value||11;
          });
        },100)
        return card;
      });

      return updatedAceCards.concat(cardListWithoutAce);
    }
  }
};
const validateCardState = (cardsList: CardCharacter[]) => {
  const filteredCardsList = evaluateAce(cardsList);

  const totalValue = accumulator(filteredCardsList!);
};

export  { validateCardState, accumulator, evaluateAce };
