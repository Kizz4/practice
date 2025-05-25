import { useState, useEffect } from 'react'
import { cards } from './data/Cards';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';

import confetti from 'canvas-confetti';

import './App.css'


function App() {
  const [indexCurrentCard, setIndexCurrentCard] = useState(0);
  const totalCards = cards.length;
  const currentCard = cards[indexCurrentCard];




  useEffect(() => {
    if (indexCurrentCard / (totalCards-1) < 1) return;

    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 30,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });
    }, 200);

    return () => clearInterval(interval);
  }, [indexCurrentCard]);



  return (
    <>
      <h2>Flash Cards</h2>
      <ProgressBar indexCard={indexCurrentCard} total={totalCards} />

      <FlashCard
        question={currentCard.question}
        answer={currentCard.answer}
        setIndexCurrentCard={setIndexCurrentCard}
        totalCards={totalCards}
      />

    </>
  )
}

export default App
