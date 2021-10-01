import {
  calculateDealerStrategy,
  declareWinner,
  InitGame,
  promptCard
} from '../src/app';

let gameSession: InitGame;

gameSession = new InitGame();
gameSession.startGame();

describe('gameSession', () => {
  it('Start game in GameSession and generate default cards for Player and dealer profile', () => {
    expect(gameSession.startGame().flat(2)).toHaveLength(2);
  });
  it('Check if Dealer strategy is optimal', () => {
    expect(calculateDealerStrategy()).toBeUndefined();
  });

  it('To validates if games exists on Player or dealer wins ', () => {
    gameSession.shuffledCardDeck = [];
    expect(declareWinner('player')).toBeUndefined();
    expect(declareWinner('dealer')).toBeUndefined();
    expect(declareWinner('NiL',"draw")).toBeUndefined();
  });
});
