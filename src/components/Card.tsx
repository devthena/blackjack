import React from 'react';

import { Card } from '../lib/types';
import { getSuitSVG } from '../lib/utils';

import styles from '../styles/card.module.scss';

export const CardBox: React.FC<Card> = ({ rank, small, suit }) => {
  const suitSVG = getSuitSVG(suit);
  const smallClass = small ? styles.small : '';

  return (
    <div className={`${styles.card} ${styles[suit]} ${smallClass}`}>
      <p>{rank}</p>
      {suitSVG}
    </div>
  );
};
