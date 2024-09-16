import { GameState } from '../lib/types';

export const initialState: GameState = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  gameStatus: 'standby',
};
