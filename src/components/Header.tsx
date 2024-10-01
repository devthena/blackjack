import React from 'react';

import { ModalContent } from '../constants';
import { useBlackjack } from '../hooks';
import { BackIcon, RulesIcon, StatsIcon } from '../lib/icons';

import styles from '../styles/header.module.scss';

export const Header: React.FC = () => {
  const { gameStatus, resetGame, updateModal } = useBlackjack();

  return (
    <header className={styles.container}>
      <div className={styles.left}>
        {gameStatus !== 'standby' && (
          <>
            <button className={styles.back} onClick={resetGame}>
              <BackIcon />
            </button>
            <button className={styles.backDesktop} onClick={resetGame}>
              <BackIcon />
              <span>QUIT</span>
            </button>
          </>
        )}
      </div>
      <h1>Blackjack</h1>
      <div className={styles.right}>
        <button
          className={styles.rules}
          onClick={() =>
            updateModal({ content: ModalContent.Rules, display: true })
          }>
          <RulesIcon />
        </button>
        {gameStatus !== 'standby' && (
          <button
            className={styles.stats}
            onClick={() =>
              updateModal({ content: ModalContent.Stats, display: true })
            }>
            <StatsIcon />
          </button>
        )}
      </div>
    </header>
  );
};
