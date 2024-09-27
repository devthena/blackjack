import React from 'react';

import { useBlackjack } from '../hooks';
import { BalanceProps } from '../lib/types';

import styles from '../styles/balance.module.scss';

export const Balance: React.FC<BalanceProps> = ({
  betDisabled = false,
  handleBetChange,
}) => {
  const { balance, bet } = useBlackjack();

  const betValue = !bet || bet < 1 ? '' : bet;

  return (
    <div className={styles.balance}>
      <div className={styles.betBox}>
        <span>BET:</span>
        <input
          disabled={betDisabled}
          type="number"
          onChange={e => {
            if (e.target.value === '') return handleBetChange(null);

            const newBet = parseInt(e.target.value, 10);
            if (newBet > 0) handleBetChange(newBet);
          }}
          value={betValue}
        />
      </div>
      <div className={styles.balanceBox}>
        <span>BALANCE:</span>
        <span>{balance}</span>
      </div>
    </div>
  );
};
