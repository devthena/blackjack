import { initialState } from '../constants';
import { GameAction, GameState } from './types';
import { dealerPlay, drawCard } from './utils';

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'GAME_START':
      return {
        ...state,
        deck: action.payload,
        playerHand: [drawCard(action.payload), drawCard(action.payload)],
        dealerHand: [drawCard(action.payload)],
        gameStatus: 'play',
      };

    case 'HIT':
      if (state.deck.length === 0) return state;

      const newCard = drawCard(state.deck);
      const newPlayerHand = [...state.playerHand, newCard];

      return {
        ...state,
        deck: state.deck,
        playerHand: newPlayerHand,
      };

    case 'STAND':
      const newDealerHand = dealerPlay(state.deck, state.dealerHand);

      return {
        ...state,
        dealerHand: newDealerHand,
      };

    case 'GAME_END':
      return {
        ...state,
        gameStatus: action.payload,
      };

    case 'GAME_RESET':
      return { ...initialState };

    default:
      return state;
  }
};
