import * as inquirer from 'inquirer';
import { GenerateCardDeck } from './lib/HandleDeck';
import { PlayerDesk, CardCharacter } from './model/Interface.model';
import { logger } from './util/util';
import { accumulator, evaluateAce } from './lib/validations';
class InitGame {
  shuffledCardDeck: CardCharacter[];
  customersHand: PlayerDesk = {} as PlayerDesk;
  dealersHand: PlayerDesk = {} as PlayerDesk;

  constructor() {
    this.shuffledCardDeck = new GenerateCardDeck(true).generateCard();
  }

  startGame = () => {
    console.log(this.shuffledCardDeck.length);
    try {
      this.customersHand.cards = [
        this.shuffledCardDeck.shift()!,
        this.shuffledCardDeck.shift()!
      ];
      console.log(this.shuffledCardDeck.length);
      this.dealersHand.cards = [
        this.shuffledCardDeck.shift()!,
        this.shuffledCardDeck.shift()!
      ];
      console.log(this.shuffledCardDeck.length);
    } catch (error: any) {
      //NotifyErrorEvent (timenow, error, this.shuffledCardDeck.length)+
      logger.log(error.stack);
    }
    return [this.customersHand, this.dealersHand];
  };

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

//todo
//Handle same card Split logic

console.table(gameSession.customersHand.cards);

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
          console.table(gameSession.customersHand.cards);
          gameSession.customersHand.totalCardVal = accumulator(
            evaluateAce(gameSession.customersHand.cards)!
          );
          if (gameSession.customersHand.totalCardVal > 21) {
            console.log('bust bust bust; Dealer wins the game');
            return;
          }
          promptCard(player);
        } else {
          console.log(answers);
        }
      } else {
        console.table(gameSession.dealersHand.cards);
        gameSession.dealersHand.totalCardVal = accumulator(
          evaluateAce(gameSession.dealersHand.cards)!
        );
        if (gameSession.dealersHand.totalCardVal > 21) {
          console.log('bust bust bust; Player wins the game');
          return;
        } else {
          promptCard(player);
        }
      }
    });
};

promptCard();

const calculateDealerStrategy = () => {
  gameSession.dealersHand.totalCardVal = accumulator(
    evaluateAce(gameSession.dealersHand.cards)!
  );
};
