import { GameState } from '../lib/types';
import { initialStats } from './initialStats';

export const initialState: GameState = {
  stats: initialStats,
  balance: 1000,
  bet: 100,
  deck: [],
  playerHand: [],
  dealerHand: [],
  gameStatus: 'standby',
};
