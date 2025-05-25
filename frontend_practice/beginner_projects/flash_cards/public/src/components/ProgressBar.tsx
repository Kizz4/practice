import { useRef, useState, useEffect} from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    indexCard: number;
    total: number;
}

function getBarColor(progress: number): string {
    if (progress <= 20) return 'red';
    if (progress <= 45) return 'orange';
    if (progress <= 70) return 'gold';
    if (progress <= 99) return 'yellow';
    return 'lightgreen';
}


function ProgressBar(props: ProgressBarProps) {
    const [centerOffset, setCenterOffset] = useState(0);
    const progressPercentage = Math.round((props.indexCard / (props.total - 1)) * 100);
    const colorBar = getBarColor(progressPercentage);

    const progressBarContainerRef = useRef<HTMLDivElement>(null);
    const percentageRef = useRef<HTMLParagraphElement>(null);
    const currentCardRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        function updateOffset() {
            const progressBarContainer = progressBarContainerRef.current;
            const percentage = percentageRef.current;
            const currentCard = currentCardRef.current;

            if (!percentage || !currentCard || !progressBarContainer) return;

            const containerWidth = progressBarContainer.getBoundingClientRect().width;
            const progressBarRight = progressBarContainer.getBoundingClientRect().left
                + progressBarContainer.getBoundingClientRect().width * (progressPercentage / 100);
            const currentCardLeft = currentCard.getBoundingClientRect().left;
            const percentageLength = percentage.getBoundingClientRect().width;

            const projectedRight = progressBarRight + percentageLength * 2;

            const offset = projectedRight >= currentCardLeft
                ? Math.round((containerWidth / percentageLength) * 50 - 50)
                : 0;

            setCenterOffset(offset);
        }

        updateOffset();

        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, [props.indexCard]);




    return (
        <div ref={progressBarContainerRef} id="progress-bar-container" role="progressbar"
            aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100} aria-label={`Progress: ${progressPercentage}%`}>
            <span id="bar"
                style={{
                    width: centerOffset > 0 ? `calc(${progressPercentage}% - 0.4em)` : `${progressPercentage}%`,
                    backgroundColor: colorBar,
                    position: centerOffset > 0 ? "absolute" : "inherit"
                }}></span>
            <p ref={percentageRef} id="percentage"
                style={{ transform: `translateX(${centerOffset}%)` }}
                aria-live="polite"
            >
                {progressPercentage}%
            </p>
            <p ref={currentCardRef} id="current-card"
                aria-live="polite">
                {props.indexCard + 1} of {props.total}
            </p>
        </div>
    );
};

export default ProgressBar;
