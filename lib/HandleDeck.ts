import { CardCharacter } from './Interface.model';
import { logger } from './util';

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
    this.shuffledState = isShuffled ?? false;
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
              value: 0
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

  drawRandomCard(listOfCards?: CardCharacter[]) {
    const cardsList: CardCharacter[] = listOfCards || this.generateCard();
    try {
      const randomIndex = Math.floor(cardsList.length * Math.random());
      return cardsList[randomIndex];
    } catch (error: any) {
      //NotifyErrorEvent (timenow, error, listOfCards)+
      logger.log(error?.stackTrace());
    }
  }
}

export { GenerateCardDeck };
