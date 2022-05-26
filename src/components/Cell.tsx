
import React from 'react';

interface CellProps {
    activeCells: any;
    gameState: any;
    recordGuess: any;
    id: any;
    wrongGuesses: any;
    correctGuesses:any;
}

export const Cell: React.FC<CellProps> = (props) => {

    let active = () => {
        return props.activeCells.indexOf(props.id) >= 0;
    }

    let handleClick = () => { 
        if (guessState() === undefined && 
            props.gameState === "recall") { 
            props.recordGuess(props.id, active()); 
        } 
    }

    let guessState = () => { 
        if (props.correctGuesses.indexOf(props.id) >= 0) {
            return true; 
        }  else if (props.wrongGuesses.indexOf(props.id) >= 0) { 
            return false; 
        } 
    }

    let showActiveCells = () => { 
        return ["memorize", "lost"].indexOf(props.gameState) >= 0; 
    }

    let className = "cell"; 

    if (props.gameState === "memorize" && active()) { 
        className += " active"; 
    } 

    if (showActiveCells() && active()) { 
        className += " active"; 
    }

    className += " guess-" + guessState();

    return ( 
        <div className={ className }  onClick={ handleClick }> 
        </div> 
    ); 
    
}
