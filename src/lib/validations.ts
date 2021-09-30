
import inquirer from 'inquirer';
import { CardCharacter } from '../model/Interface.model';
class ValidateCardsState {
  constructor(playersCard: CardCharacter[], dealerCard: CardCharacter[]) {}
}


const rulesList = {} as any;


 /**
 * @Class {accumulator} calculates the total value of card based on ranks.
 *
 * @param {string} cardsList  random array of cards 
 *
 * @returns {number} totalCardCounter
 */


function accumulator(cardsList: CardCharacter[]) {
  const CardCounter = cardsList
    .map((cards: CardCharacter) => Number(cards.value))
    .reduce((acc: number, current: number) => acc + current, 0);
  return CardCounter;
}

 /**
 * @Class {evaluateAce} Get confirmation on value for A suite card to be either 1 or 11 .
 *
 * @param {Array} listOfCards  random array of cards 
 *
 * @returns {updatedAceCards} updated card list with used assigned value for A rank cards.
 */


const evaluateAce = ([...listOfCards]: CardCharacter[]) => {
  if (!listOfCards.some((card) => card.value === 11)) {
    return listOfCards;
  } else {
    let [cardListWithoutAce, cardswithAce] = [
      listOfCards.filter((cards) => (cards.rank !== 'A' && (cards.isAceValAssigned))  ),
      listOfCards.filter((cards) => cards.rank === 'A' && !(cards.isAceValAssigned))
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
            card.isAceValAssigned = true
          });
        },3000)
        return card;
      });

      return updatedAceCards.concat(cardListWithoutAce);
    }
  }
  return listOfCards;
};


export  {  accumulator, evaluateAce };
