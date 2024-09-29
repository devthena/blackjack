import React from 'react';

import { useBlackjack } from '../hooks';

import { Balance } from './Balance';
import { Stats } from './Stats';

import styles from '../styles/landing.module.scss';

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
      <Stats />
    </div>
  );
};
