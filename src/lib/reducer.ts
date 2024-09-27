import { initialState } from '../constants';
import { Card, GameAction, GameState } from './types';
import { dealerPlay, drawCard, getHandValue } from './utils';

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'BET_UPDATE':
      return {
        ...state,
        bet: action.payload,
      };

    case 'GAME_START':
      if (action.payload.bet > state.balance) {
        return {
          ...state,
          gameStatus: 'standby',
        };
      }

      const deck: Card[] = [...action.payload.deck];

      const playerHand = [drawCard(deck), drawCard(deck)];
      const dealerHand = [drawCard(deck)];

      return {
        ...state,
        balance: state.balance - action.payload.bet,
        bet: action.payload.bet,
        deck: deck,
        playerHand: playerHand,
        dealerHand: dealerHand,
        gameStatus: 'play',
      };

    case 'DOUBLE':
      if (state.deck.length === 0 || !state.bet) return state;

      const copyDeck = [...state.deck];
      const newPlayerHand = [...state.playerHand, drawCard(copyDeck)];

      const playerHandValue = getHandValue(newPlayerHand);

      const newDealerHand =
        playerHandValue < 21
          ? dealerPlay(copyDeck, state.dealerHand)
          : state.dealerHand;

      return {
        ...state,
        balance: state.balance - state.bet,
        bet: state.bet * 2,
        deck: copyDeck,
        dealerHand: newDealerHand,
        playerHand: newPlayerHand,
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
      const updatedDealerHand = dealerPlay(currentDeck, state.dealerHand);

      return {
        ...state,
        deck: currentDeck,
        dealerHand: updatedDealerHand,
      };

    case 'GAME_END':
      if (state.gameStatus === action.payload || !state.bet) return state;

      let addend = 0;

      if (action.payload === 'win' || action.payload === 'dealer_bust') {
        addend = state.bet * 2;
      } else if (action.payload === 'blackjack') {
        addend = state.bet + Math.round(state.bet * 1.5);
      } else if (action.payload === 'push') {
        addend = state.bet;
      }

      return {
        ...state,
        balance: state.balance + addend,
        gameStatus: action.payload,
      };

    case 'GAME_RESET':
      return {
        ...initialState,
        balance: state.balance,
        bet: state.bet,
      };

    default:
      return state;
  }
};
