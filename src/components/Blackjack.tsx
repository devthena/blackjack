import React, { useEffect } from 'react';

import { GAME_OVER_STATUS } from '../constants';
import { useBlackjack } from '../hooks';
import { getHandValue, getResultHeadline } from '../lib/utils';

import { CardBox } from './Card';

import styles from '../styles/blackjack.module.scss';

export const Blackjack: React.FC = () => {
  const {
    deck,
    dealerHand,
    gameStatus,
    playerHand,
    isGameOver,
    playerHit,
    playerStand,
    startGame,
  } = useBlackjack();

  const gameOver = GAME_OVER_STATUS.includes(gameStatus);

  useEffect(() => {
    isGameOver();
  }, [isGameOver]);

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        <p className={styles.deck}>Deck: {deck.length}</p>
        <div className={styles.dealer}>
          <div>
            <p className={styles.name}>Dealer</p>
            <p className={styles.value}>{getHandValue(dealerHand)}</p>
          </div>
          <div className={styles.cards}>
            {dealerHand.map((card, i) => (
              <CardBox key={i} suit={card.suit} rank={card.rank} />
            ))}
          </div>
        </div>
        {!gameOver && (
          <div className={styles.actions}>
            <button>DOUBLE</button>
            <button onClick={playerHit}>HIT</button>
            <button onClick={playerStand}>STAND</button>
          </div>
        )}
        {gameOver && (
          <div className={styles.result}>
            <p>RESULT: {getResultHeadline(gameStatus)}</p>
            <button onClick={startGame}>PLAY AGAIN</button>
          </div>
        )}
        <div className={styles.player}>
          <div>
            <p className={styles.name}>Player</p>
            <p className={styles.value}>{getHandValue(playerHand)}</p>
          </div>
          <div className={styles.cards}>
            {playerHand.map((card, i) => (
              <CardBox key={i} suit={card.suit} rank={card.rank} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.balance}>
        <p>Bet: 100</p>
        <p>Balance: 900</p>
      </div>
    </div>
  );
};
