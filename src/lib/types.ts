import React from 'react';

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export interface Card {
  small?: boolean;
  suit: Suit;
  rank: Rank;
}

export type Deck = Card[];

export type GameStatus =
  | 'blackjack'
  | 'bust'
  | 'dealer_bust'
  | 'lose'
  | 'play'
  | 'push'
  | 'standby'
  | 'win';

export interface GameState {
  balance: number;
  bet: number | null;
  deck: Deck;
  playerHand: Card[];
  dealerHand: Card[];
  gameStatus: GameStatus;
}

export type GameAction =
  | { type: 'BET_UPDATE'; payload: number }
  | { type: 'GAME_START'; payload: { bet: number; deck: Card[] } }
  | { type: 'DOUBLE' }
  | { type: 'HIT' }
  | { type: 'STAND' }
  | { type: 'GAME_END'; payload: GameStatus }
  | { type: 'GAME_RESET' };

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export interface BalanceProps {
  betDisabled?: boolean;
  handleBetChange: Function;
}
