import { Card, Rank, Suit } from './types';

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
  return deck.pop()!;
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

export const shuffleDeck = (): Card[] => {
  // Create a new deck of 52 cards
  const deck: Card[] = [...Array(52).keys()].map((_, i) => ({
    suit: ['hearts', 'diamonds', 'clubs', 'spades'][Math.floor(i / 13)] as Suit,
    rank: ((i % 13) + 1).toString() as Rank,
  }));

  // Fisher-Yates Shuffle Algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }

  return deck;
};
