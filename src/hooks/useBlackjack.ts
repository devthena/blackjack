import { useContext } from 'react';

import { GameContext } from '../lib/context';
import { Card } from '../lib/types';
import { drawCard, getHandValue, shuffleDeck } from '../lib/utils';

export const useBlackjack = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useBlackjack must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const startGame = () => {
    const deck: Card[] = shuffleDeck();
    dispatch({ type: 'GAME_START', payload: deck });
  };

  const isGameOver = () => {
    const playerHandValue = getHandValue(state.playerHand);
    const dealerHandValue = getHandValue(state.dealerHand);

    if (playerHandValue > 21) {
      dispatch({ type: 'GAME_END', payload: 'bust' });
      return true;
    }

    if (dealerHandValue > 21) {
      dispatch({ type: 'GAME_END', payload: 'dealer_bust' });
      return true;
    }

    if (playerHandValue === 21) {
      dispatch({ type: 'GAME_END', payload: 'blackjack' });
      return true;
    }

    if (dealerHandValue >= 17 && dealerHandValue > playerHandValue) {
      dispatch({ type: 'GAME_END', payload: 'lose' });
      return true;
    }

    if (dealerHandValue >= 17 && playerHandValue > dealerHandValue) {
      dispatch({ type: 'GAME_END', payload: 'win' });
      return true;
    }

    if (dealerHandValue >= 17 && dealerHandValue === playerHandValue) {
      dispatch({ type: 'GAME_END', payload: 'push' });
      return true;
    }

    return false;
  };

  const playerHit = async () => {
    const newCard = drawCard(state.deck);
    const newPlayerHand = [...state.playerHand, newCard];

    // Dispatch the PLAYER_HIT action
    await dispatch({ type: 'HIT', payload: newPlayerHand });

    isGameOver();
  };

  return {
    ...state,
    playerHit,
    startGame,
  };
};
