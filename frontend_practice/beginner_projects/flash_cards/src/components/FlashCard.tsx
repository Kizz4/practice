import { useState, useEffect } from 'react';
import './FlashCard.css';

interface FlashCardProps {
    question: string;
    answer: string;
    setIndexCurrentCard: React.Dispatch<React.SetStateAction<number>>;
    totalCards: number;
}

function FlashCard(props: FlashCardProps) {
    const [flipped, setFlipped] = useState(false);

    function fireChangement(direction: 'next' | 'prev') {
        setFlipped(false);
        props.setIndexCurrentCard((prev) => {
            if (direction === 'next' && prev < props.totalCards - 1) return prev + 1;
            if (direction === 'prev' && prev > 0) return prev - 1;
            return prev;
        });
    }

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                fireChangement('next');
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                fireChangement('prev');
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);


    return (
        <div id="card">

            <div id="card-answer-question">
                <p className={flipped ? "" : "active"} id="question">{props.question}</p>
                <p className={flipped ? "active" : ""} id="answer">{props.answer}</p>
            </div>

            <div id="button-container">
                <button className="change-card" id="previous"
                    onClick={() => fireChangement("prev")}
                    aria-label="Previous flashcard">
                    &lt; Previous
                </button>

                <button id="hide-show-state"
                    onClick={() => setFlipped((flipped) => !flipped)}
                    aria-pressed={flipped} aria-label={flipped ? "Hide answer" : "Show answer"}>
                    {flipped ? "Hide" : "Show"} Answer
                </button>

                <button className="change-card" id="next"
                    onClick={() => fireChangement("next")}
                    aria-label="Next flashcard">
                    Next &gt;
                </button>
            </div>

        </div>
    );
};

export default FlashCard;

