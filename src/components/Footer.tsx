import React from 'react';

interface FooterProps {
    activeCellsCount: any;
    correctGuesses: any;
    gameState: any;
    playAgain: any;
}

export const Footer:React.FC<FooterProps> = (props) => {
    const hints: any = {
        ready: "Get Ready", 
        memorize: "Memorize", 
        recall: "Recall", 
        won: "Well Played", 
        lost: "Game Over"
     };

    let remainingCount = () => { 
        if (props.gameState !== "recall") { return null; } 
        return ( 
            <div className="remaining-count"> 
                {props.activeCellsCount - props.correctGuesses.length} 
            </div> 
        ); 
    }

    let playAgainButton = () => { 
        if (["won", "lost"].indexOf(props.gameState) >= 0) { 
            return ( 
                <button className="play-again-button" 
                        onClick={props.playAgain}> 
                        Play Again 
                </button> ); 
        } 
    }
   
    return (
        <div className="footer">
            <div className="hint">
                { hints[props.gameState]}
            </div>
            {remainingCount()}
            {playAgainButton()}
        </div>
    );
    
}

