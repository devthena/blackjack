import { useCallback, useContext } from 'react';

import { GameContext } from '../lib/context';
import { Card } from '../lib/types';
import { getHandValue, shuffleDeck } from '../lib/utils';

export const useBlackjack = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useBlackjack must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const resetGame = useCallback(() => {
    dispatch({ type: 'GAME_RESET' });
  }, [dispatch]);

  const startGame = useCallback(() => {
    const deck: Card[] = shuffleDeck();
    dispatch({ type: 'GAME_START', payload: deck });
  }, [dispatch]);

  const isGameOver = useCallback(() => {
    const playerHandValue = getHandValue(state.playerHand);
    const dealerHandValue = getHandValue(state.dealerHand);

    if (playerHandValue > 21) {
      console.log('bust');
      dispatch({ type: 'GAME_END', payload: 'bust' });
    }

    if (dealerHandValue > 21) {
      dispatch({ type: 'GAME_END', payload: 'dealer_bust' });
    } else if (playerHandValue === 21) {
      dispatch({ type: 'GAME_END', payload: 'blackjack' });
    } else if (dealerHandValue >= 17 && dealerHandValue > playerHandValue) {
      dispatch({ type: 'GAME_END', payload: 'lose' });
    } else if (dealerHandValue >= 17 && playerHandValue > dealerHandValue) {
      dispatch({ type: 'GAME_END', payload: 'win' });
    } else if (dealerHandValue >= 17 && dealerHandValue === playerHandValue) {
      dispatch({ type: 'GAME_END', payload: 'push' });
    }
  }, [dispatch, state.dealerHand, state.playerHand]);

  const playerHit = useCallback(() => {
    dispatch({ type: 'HIT' });
  }, [dispatch]);

  const playerStand = useCallback(() => {
    dispatch({ type: 'STAND' });
  }, [dispatch]);

  return {
    ...state,
    isGameOver,
    playerHit,
    playerStand,
    resetGame,
    startGame,
  };
};
