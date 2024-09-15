import { createContext, ReactNode, useReducer } from 'react';

import { initialState } from '../constants';

import { gameReducer } from './reducer';
import { GameContextType } from './types';

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
