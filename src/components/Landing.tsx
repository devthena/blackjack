import React from 'react';
import { useBlackjack } from '../hooks';
import styles from '../styles/landing.module.scss';
import { Balance } from './Balance';

export const Landing: React.FC = () => {
  const { balance, bet, startGame, updateBet } = useBlackjack();

  return (
    <div className={styles.landing}>
      <Balance handleBetChange={updateBet} />
      <button
        className={styles.play}
        disabled={!bet || bet > balance || balance === 0}
        onClick={() => {
          if (bet) startGame(bet);
        }}>
        PLAY
      </button>
    </div>
  );
};
