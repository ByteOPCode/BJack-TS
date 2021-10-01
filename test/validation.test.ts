import { accumulator, evaluateAce } from '../src/lib/validations';
import { GenerateCardDeck } from '../src/lib/HandleDeck';
import { CardCharacter } from '../src/model/Interface.model';
import inquirer from 'inquirer';
import { json } from 'stream/consumers';

const gameInstance = new GenerateCardDeck(true);
const randomlyDrawnCards: CardCharacter[] = [
  gameInstance.drawRandomCard()!,
  gameInstance.drawRandomCard()!
];

const arbitraryCard = {
  rank: 'A',
  cardType: 'clover',
  Symbol: `A-clover`,
  value: 11
};

describe('evaluateAce', () => {
  it('Mock inquirer', () => {
    jest.mock('inquirer', () => {
      return { prompt: jest.fn() };
    });
    expect(evaluateAce(randomlyDrawnCards).length).toBeGreaterThanOrEqual(1);
    randomlyDrawnCards.push(arbitraryCard);
    expect(evaluateAce(randomlyDrawnCards)).toContain(arbitraryCard);
  });
  describe('Accumulator', () => {
    it('verify accumulator returns a number', () => {
      expect(typeof accumulator(randomlyDrawnCards)).toBe('number');
    });
  });
});
