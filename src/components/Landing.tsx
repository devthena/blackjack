import React from 'react';
import { useBlackjack } from '../hooks';
import styles from '../styles/landing.module.scss';

export const Landing: React.FC = () => {
  const { startGame } = useBlackjack();

  return (
    <div className={styles.landing}>
      <div>
        <span>Bet:</span>
        <input type="text" />
      </div>
      <p>Balance: 1000</p>
      <button onClick={startGame}>PLAY</button>
    </div>
  );
};
