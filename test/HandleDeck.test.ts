import { GenerateCardDeck } from '../src/lib/HandleDeck';
import { CardCharacter } from '../src/model/Interface.model';

const arbitraryCard: CardCharacter = {
  rank: 'K',
  cardType: 'clover',
  Symbol: `${'K'}-${'clover'}`,
  value: 10
};
describe('GenerateCardDeck', () => {
  const cardDeckList = new GenerateCardDeck(false);
  describe('generateCard', () => {
    it(`should return 52 cards in sorted order`, () => {
      const generateCard = cardDeckList.generateCard();
      expect(generateCard).toBeInstanceOf(Array);
      expect(generateCard).toHaveLength(52);
    });
    it(`Generated card deck should have arbitary card`, () => {
      expect(cardDeckList.generateCard()).toEqual(
        expect.arrayContaining([arbitraryCard])
      );
    });

    it(`Randomly drawn card should have appropriate object properties`, () => {
      expect(Object.keys(cardDeckList.drawRandomCard()!).sort()).toEqual(
        Object.keys(arbitraryCard).sort()
      );
    });
  });
});
