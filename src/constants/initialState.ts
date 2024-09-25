import { GameState } from '../lib/types';

export const initialState: GameState = {
  balance: 1000,
  bet: 100,
  deck: [],
  playerHand: [],
  dealerHand: [],
  gameStatus: 'standby',
};
