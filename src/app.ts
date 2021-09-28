import { GenerateCardDeck } from '../lib/HandleDeck';
import { PlayerDesk } from '../lib/Interface.model';

let cardsList = new GenerateCardDeck(true);

const shuffledCardDeck = cardsList.generateCard();

console.log(shuffledCardDeck);

const playerDesk: PlayerDesk = {} as PlayerDesk;

playerDesk.cards = [shuffledCardDeck.pop()!, shuffledCardDeck.pop()!];
