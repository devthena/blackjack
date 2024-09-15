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
  suit: Suit;
  rank: Rank;
}

export type Deck = Card[];

export type GameStatus =
  | 'blackjack'
  | 'bust'
  | 'dealer_bust'
  | 'dealer_turn'
  | 'lose'
  | 'play'
  | 'push'
  | 'standby'
  | 'win';

export interface GameState {
  deck: Deck;
  playerHand: Card[];
  dealerHand: Card[];
  gameStatus: GameStatus;
}

export type GameAction =
  | { type: 'GAME_START'; payload: Card[] }
  | { type: 'HIT'; payload: Card[] }
  | { type: 'STAND' }
  | { type: 'GAME_END'; payload: GameStatus }
  | { type: 'DEALER_TURN' }
  | { type: 'GAME_RESET' };

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}
