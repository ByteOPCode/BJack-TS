import * as inquirer from 'inquirer';
import { GenerateCardDeck } from './lib/HandleDeck';
import { PlayerDesk, CardCharacter } from './model/Interface.model';
import { logger } from './util/util';
import { accumulator, evaluateAce } from './lib/validations';
import { exit } from 'process';

class InitGame {
  shuffledCardDeck: CardCharacter[];
  customersHand: PlayerDesk = {} as PlayerDesk;
  dealersHand: PlayerDesk = {} as PlayerDesk;

  constructor() {
    this.shuffledCardDeck = new GenerateCardDeck(true).generateCard();
  }

  /**
   * @Method {startGame} generates two random cards to customer and Dealer profile.
   *
   * @param {NULL}
   *
   * @return {Array} Array of customerProfile and dealerProfile in PlayerDesk structure
   */

  startGame = () => {
    try {
      this.customersHand.cards = [
        this.shuffledCardDeck.shift()!,
        this.shuffledCardDeck.shift()!
      ];
      this.dealersHand.cards = [
        this.shuffledCardDeck.shift()!,
        this.shuffledCardDeck.shift()!
      ];
    } catch (error: any) {
      //NotifyErrorEvent (timenow, error, this.shuffledCardDeck.length)+
      logger.log(error.stack);
    }
    return [this.customersHand, this.dealersHand];
  };

  /**
   * @Method {drawRandomCard} Retrieves random card from card deck and pushes to Player profile .
   *
   * @param {string} player Defines the character profile to which the newly generated card should assign
   *
   */

  drawRandomCard = (player: 'player' | 'dealer') => {
    const card = this.shuffledCardDeck.shift();
    if (card === undefined) throw new Error('No more cards in the Deck');
    if (player == 'player') this.customersHand.cards.push(card);
    else this.dealersHand.cards.push(card);
  };

  showPlayerAndDealerCard = () => {};
}

const gameSession = new InitGame();

gameSession.startGame();
gameSession.customersHand.totalCardVal = accumulator(
  evaluateAce(gameSession.customersHand.cards)!
);

//todo
//Handle same card Split logic

console.info('Customer Dashboard');
console.table(gameSession.customersHand.cards);

/**
 * @Method {promptCard} Recursively asks for Hit or Stand; if Hit, a new card will be assigned and stand would pass the chance to dealer .
 *
 * @param {string} player Defines the character profile actively playing the game and update the card to respective profile on game instance
 *
 */

const promptCard = (player: 'player' | 'dealer' = 'player') => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'prompt',
        message: 'What do you want to do?',
        choices: ['Hit', 'stand'],
        filter(val) {
          return val.toLowerCase();
        }
      }
    ])
    .then((answers) => {
      if (answers.prompt === 'hit') {
        gameSession.drawRandomCard(player);
        if (player == 'player') {
          gameSession.customersHand.totalCardVal = accumulator(
            evaluateAce(gameSession.customersHand.cards)!
          );
          console.info('Customer Dashboard');
          console.log(gameSession.customersHand.totalCardVal);
          console.table(gameSession.customersHand.cards);

          if (gameSession.customersHand.totalCardVal > 21) {
            declareWinner('dealer');
            return;
          }
          promptCard(player);
        }
      } else {
        calculateDealerStrategy();
      }
    });
};

promptCard('player');

/**
 * @Method {calculateDealerStrategy}  Manages game strategy for Dealer profile.
 *
 */
const calculateDealerStrategy = () => {
  console.info('Dealer Dashboard');
  console.table(gameSession.dealersHand.cards);
  gameSession.dealersHand.totalCardVal =
    accumulator(evaluateAce(gameSession.dealersHand.cards)!) || 0;
  /*
  From the quora Answer https://www.quora.com/What-is-the-average-score-of-the-dealer-in-Blackjack-Is-it-20

    2 to 8? Varies from 17 to 17.8;
    A 9? 18.4;
    10? 19.1;
    and an Ace? 19.4.

    Average = 18.5

    set threshold of dealers total value to 18.5
  */

  switch (true) {
    case gameSession.dealersHand.totalCardVal > 21:
      declareWinner('player');
      break;

    case gameSession.dealersHand.totalCardVal < 18:
      gameSession.drawRandomCard('dealer');
      calculateDealerStrategy();
      break;
    case gameSession.dealersHand.totalCardVal > 18:
      console.log('Dealer Total=>', gameSession.dealersHand.totalCardVal);
      console.log('Player Total =>', gameSession.customersHand.totalCardVal);
      if (
        gameSession.dealersHand.totalCardVal >
        gameSession.customersHand.totalCardVal!
      ) {
        declareWinner('dealer');
      } else if (
        gameSession.dealersHand.totalCardVal! - 21 ==
        gameSession.customersHand.totalCardVal! - 21
      ) {
        declareWinner('NiL', 'draw');
      } else {
        declareWinner('player');
      }
      break;
  }

  if (gameSession.dealersHand.totalCardVal > 18) {
  }
};

/**
 * @Method {declareWinner}  Output's the player and exits gracefully.
 *
 */
const declareWinner = (
  participant: 'player' | 'dealer' | 'NiL',
  reason: string = 'bust'
) => {
  console.log(`${reason}; ${participant} wins the game`);
  exit(1);
};
