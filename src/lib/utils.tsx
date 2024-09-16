import { RANKS, SUITS } from '../constants';
import { ClubsIcon, DiamondsIcon, HeartsIcon, SpadesIcon } from './icons';
import { Card, GameStatus, Suit } from './types';

export const dealerPlay = (deck: Card[], hand: Card[]) => {
  let dealerHand = [...hand];
  let dealerTotal = getHandValue(dealerHand);

  while (dealerTotal < 17) {
    const newCard = drawCard(deck);
    dealerHand.push(newCard);
    dealerTotal = getHandValue(dealerHand);
  }

  return dealerHand;
};

export const drawCard = (deck: Card[]): Card => {
  const card = deck[0];
  deck.splice(0, 1);

  return card;
};

export const getHandValue = (hand: Card[]) => {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    if (card.rank === 'A') {
      aces += 1;
      total += 11; // Start with Ace being 11
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      total += 10; // Face cards are worth 10
    } else {
      total += parseInt(card.rank); // Numeric cards
    }
  }

  // Adjust for Aces if total exceeds 21
  while (total > 21 && aces > 0) {
    total -= 10; // Change one Ace from 11 to 1
    aces -= 1;
  }

  return total;
};

export const getResultHeadline = (result: GameStatus): string => {
  switch (result) {
    case 'blackjack':
      return 'BLACKJACK';
    case 'bust':
      return 'BUST';
    case 'dealer_bust':
      return 'DEALER BUST';
    case 'lose':
      return 'YOU LOSE';
    case 'win':
      return 'YOU WIN';
    case 'push':
      return 'PUSH';
    default:
      return '';
  }
};

export const getSuitSVG = (suit: Suit) => {
  switch (suit) {
    case 'clubs':
      return <ClubsIcon />;
    case 'diamonds':
      return <DiamondsIcon />;
    case 'hearts':
      return <HeartsIcon />;
    case 'spades':
      return <SpadesIcon />;
    default:
      return <SpadesIcon />;
  }
};

export const shuffleDeck = (): Card[] => {
  const newDeck: Card[] = [];

  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      newDeck.push({
        suit: suit,
        rank: rank,
      });
    });
  });

  const deck = [...newDeck, ...newDeck];

  // Fisher-Yates Shuffle Algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};
