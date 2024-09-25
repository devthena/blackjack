import React, { useState } from 'react';
import { useBlackjack } from '../hooks';
import styles from '../styles/landing.module.scss';

export const Landing: React.FC = () => {
  const { balance, bet, startGame } = useBlackjack();
  const [gameBet, setGameBet] = useState(bet);

  return (
    <div className={styles.landing}>
      <div>
        <span>Bet:</span>
        <input
          type="number"
          onChange={e => {
            setGameBet(parseInt(e.target.value, 10));
          }}
          value={gameBet}
        />
      </div>
      <p>Balance: {balance}</p>
      <button
        disabled={gameBet > balance || balance === 0}
        onClick={() => startGame(gameBet)}>
        PLAY
      </button>
    </div>
  );
};
