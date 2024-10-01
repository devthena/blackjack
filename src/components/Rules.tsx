import React from 'react';
import styles from '../styles/rules.module.scss';

export const Rules: React.FC = () => {
  return (
    <div className={styles.rules}>
      <h3>HOW TO PLAY</h3>
      <p>Get closer to 21 than the Dealer</p>
      <div className={styles.list}>
        <ul>
          <li>Aces can be used as a 1 or 11</li>
          <li>Cards 2-10 are worth their face value</li>
          <li>Face cards J, Q, and K are worth 10</li>
        </ul>
        <ul>
          <li>
            <span className={styles.green}>HIT</span> - Draw another card
          </li>
          <li>
            <span className={styles.green}>STAND</span> - Keep your hand and end
            your turn
          </li>
          <li>
            <span className={styles.green}>DOUBLE</span> - Doubled bet and draw
            a last card
          </li>
        </ul>
      </div>
    </div>
  );
};
