import React from 'react';

import { Card } from '../lib/types';
import { getSuitSVG } from '../lib/utils';

import styles from '../styles/card.module.scss';

export const CardBox: React.FC<Card> = ({ rank, suit }) => {
  const suitSVG = getSuitSVG(suit);

  return (
    <div className={`${styles.card} ${styles[suit]}`}>
      <p>{rank}</p>
      {suitSVG}
    </div>
  );
};
