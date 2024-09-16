import { initialState } from '../constants';
import { Card, GameAction, GameState } from './types';
import { dealerPlay, drawCard } from './utils';

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'GAME_START':
      const deck: Card[] = [...action.payload];

      const playerHand = [drawCard(deck), drawCard(deck)];
      const dealerHand = [drawCard(deck)];

      return {
        ...state,
        deck: deck,
        playerHand: playerHand,
        dealerHand: dealerHand,
        gameStatus: 'play',
      };

    case 'HIT':
      if (state.deck.length === 0) return state;

      const updatedDeck = [...state.deck];
      const updatedPlayerHand = [...state.playerHand, drawCard(updatedDeck)];

      return {
        ...state,
        deck: updatedDeck,
        playerHand: updatedPlayerHand,
      };

    case 'STAND':
      const currentDeck = [...state.deck];
      const newDealerHand = dealerPlay(currentDeck, state.dealerHand);

      return {
        ...state,
        deck: currentDeck,
        dealerHand: newDealerHand,
      };

    case 'GAME_END':
      if (state.gameStatus === action.payload) return state;

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
