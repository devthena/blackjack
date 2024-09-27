import React, { useEffect } from 'react';

import { GAME_OVER_STATUS } from '../constants';
import { useBlackjack } from '../hooks';
import { getHandValue, getResultHeadline } from '../lib/utils';

import { CardBox } from './Card';

import styles from '../styles/blackjack.module.scss';
import { Balance } from './Balance';

export const Blackjack: React.FC = () => {
  const {
    balance,
    bet,
    deck,
    dealerHand,
    gameStatus,
    playerHand,
    isGameOver,
    playerHit,
    playerStand,
    startGame,
    updateBet,
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
              <CardBox
                key={i}
                small={dealerHand.length > 5}
                suit={card.suit}
                rank={card.rank}
              />
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
            <button
              disabled={!bet || bet > balance}
              onClick={() => {
                if (bet) startGame(bet);
              }}>
              PLAY AGAIN
            </button>
          </div>
        )}
        <div className={styles.player}>
          <div>
            <p className={styles.name}>Player</p>
            <p className={styles.value}>{getHandValue(playerHand)}</p>
          </div>
          <div className={styles.cards}>
            {playerHand.map((card, i) => (
              <CardBox
                key={i}
                small={playerHand.length > 5}
                suit={card.suit}
                rank={card.rank}
              />
            ))}
          </div>
        </div>
      </div>
      <Balance betDisabled={!gameOver} handleBetChange={updateBet} />
    </div>
  );
};
