import React from 'react';

import { ModalContent } from '../constants';
import { useBlackjack } from '../hooks';
import { CloseIcon } from '../lib/icons';

import { Rules } from './Rules';
import { Stats } from './Stats';

import styles from '../styles/modal.module.scss';

export const Modal: React.FC = () => {
  const { modal, updateModal } = useBlackjack();

  if (!modal.display) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.close}
            onClick={() => updateModal({ display: false })}>
            <CloseIcon />
          </button>
        </div>
        {modal.content === ModalContent.Rules && (
          <div className={styles.formContainer}>
            <Rules />
          </div>
        )}
        {modal.content === ModalContent.Stats && (
          <div className={styles.statsContainer}>
            <Stats />
          </div>
        )}
      </div>
    </div>
  );
};
