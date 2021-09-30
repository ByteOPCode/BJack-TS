import { CardCharacter } from '../model/Interface.model';
import { logger } from '../util/util';

 /**
 * @Class {GenerateCardDeck} Dynamically generates the Deck of cards with suits, Card Rank and allocates the value for the card according to NlackJackgame .
 *
 * @param {Boolean} isShuffled Defines whether or not to shuffle the deck of cards.  
 *
 * @returns Deck Instance
 */

class GenerateCardDeck {
  private suitsList = ['spade', 'clover', 'diamond', 'heart'];
  private cardRanks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
  ];
  private shuffledState: Boolean;
  private cardDeck: CardCharacter[] = [];
  // [Spade ♤, Clover ♣️, Diamond ♢,Heard ♥️]
  constructor(isShuffled?: Boolean) {
    this.shuffledState = isShuffled || false;
  }

  generateCard() {
    this.suitsList.forEach((suite) => {
      this.cardRanks.forEach((rank, index) => {
        switch (rank) {
          case 'J':
          case 'Q':
          case 'K':
            this.cardDeck.push({
              rank: rank,
              cardType: suite,
              Symbol: `${rank}-${suite}`,
              value: 10
            });

            break;

          case 'A':
            this.cardDeck.push({
              rank: rank,
              cardType: suite,
              Symbol: `${rank}-${suite}`,
              value: 11
            });
            break;
          default:
            this.cardDeck.push({
              rank: rank,
              cardType: suite,
              Symbol: `${rank}-${suite}`,
              value: index + 1
            });
        }
      });
    });

    return this.shuffledState
      ? this.cardDeck.sort(() => Math.random() - 0.5)
      : this.cardDeck;
  }

   /**
 * @Method {drawRandomCard} returns a random card from list of cards passed as parameters .
 *
 * @param {CardCharacter[]} player Defines the character profile actively playing the game and update the card to respective profile on game instance  
 *
 * @returns  {CardCharacter} cardsList Object with CardCharacter properties.
 */

  drawRandomCard(listOfCards?: CardCharacter[]) {
    const cardsList: CardCharacter[] = listOfCards || this.generateCard();
    try {
      const randomIndex = Math.floor(cardsList.length * Math.random());
      return cardsList[randomIndex];
    } catch (error: any) {
      //NotifyErrorEvent (timenow, error, listOfCards)+
      logger.log(error.stack);
    }
  }
}

export { GenerateCardDeck };
