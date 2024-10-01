import React, { useCallback, useEffect, useState } from 'react';

import { GAME_OVER_STATUS } from '../constants';
import { useBlackjack } from '../hooks';
import { getHandValue, getResultHeadline } from '../lib/utils';

import { Balance } from './Balance';
import { CardBox } from './Card';

import styles from '../styles/blackjack.module.scss';

export const Blackjack: React.FC = () => {
  const [isDouble, setIsDouble] = useState<boolean>(false);

  const {
    stats,
    balance,
    bet,
    deck,
    dealerHand,
    gameStatus,
    playerHand,
    isGameOver,
    playerDouble,
    playerHit,
    playerStand,
    removeUser,
    startGame,
    updateBet,
    updateStats,
    updateUser,
  } = useBlackjack();

  const handleDouble = useCallback(async () => {
    await setIsDouble(true);
    playerDouble();
  }, [playerDouble]);

  useEffect(() => {
    if (!bet) return;

    if (GAME_OVER_STATUS.includes(gameStatus)) {
      updateStats(stats);

      let newBet = bet;

      if (isDouble) {
        setIsDouble(false);
        newBet = Math.round(bet / 2);
      }

      updateBet(newBet);

      if (balance === 0) {
        removeUser();
      } else {
        updateUser({
          bet: newBet,
          balance: balance,
        });
      }
    } else {
      isGameOver();
    }
  }, [
    balance,
    bet,
    gameStatus,
    isDouble,
    stats,
    isGameOver,
    removeUser,
    updateBet,
    updateStats,
    updateUser,
  ]);

  let gameOver = GAME_OVER_STATUS.includes(gameStatus);

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
            <button disabled={!bet || bet > balance} onClick={handleDouble}>
              DOUBLE
            </button>
            <button onClick={playerHit}>HIT</button>
            <button onClick={playerStand}>STAND</button>
          </div>
        )}
        {gameOver && (
          <div className={styles.result}>
            <div>
              <p>RESULT: {getResultHeadline(gameStatus)}</p>
              <button
                disabled={!bet || bet > balance}
                onClick={() => {
                  if (bet) startGame(bet);
                }}>
                PLAY AGAIN
              </button>
            </div>
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
