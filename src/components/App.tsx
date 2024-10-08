import React from 'react';
import { useBlackjack } from '../hooks';

import { Blackjack } from './Blackjack';
import { Footer } from './Footer';
import { Header } from './Header';
import { Landing } from './Landing';

import styles from '../styles/app.module.scss';
import { Modal } from './Modal';

export const App: React.FC = () => {
  const { gameStatus } = useBlackjack();

  return (
    <main className={styles.app}>
      <Modal />
      <div className={styles.page}>
        <Header />
        {gameStatus === 'standby' && <Landing />}
        {gameStatus !== 'standby' && <Blackjack />}
      </div>
      <Footer />
    </main>
  );
};
