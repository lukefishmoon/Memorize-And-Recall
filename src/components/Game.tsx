import React, { useRef, useState, useEffect } from 'react';
import { Cell } from './Cell';
import { Row } from './Row';
import { Footer } from './Footer';

interface GameProps {
    allowedWrongAttempts: any;
    timeoutSeconds: any;
    activeCellsCount: any;
    createNewGame: any;
    activeCells: any;
    matrix: string[][];
}

export const Game: React.FC<GameProps> = (props) => {

    const [gameState, setGameState] = useState("ready");
    const [wrongGuesses, setWrongGuesses] = useState<Array<string>>([]);
    const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);

    let memorizeTimerId : any = useRef();
    let recallTimerId: any = useRef();
    let playTimerId: any = useRef(0);
    let secondsRemaining = useRef(props.timeoutSeconds);

    let finishGame = (gameState:any) => { 
        if ( playTimerId.current !== 0  && playTimerId.current !== undefined) {
            clearInterval(playTimerId.current); 
            playTimerId.current = 0;
        }
        return gameState; 
    }

    let recordGuess = (cellId:string , userGuessIsCorrect: boolean) => { 
        if (userGuessIsCorrect) { 
            setCorrectGuesses( arr => [...arr, cellId]);
            if (correctGuesses.length + 1 === props.activeCellsCount) { 
                setGameState(finishGame("won")); 
                secondsRemaining.current = 0;
            }
        } else { 
            setWrongGuesses(arr => [...arr, cellId]);
            if (wrongGuesses.length > props.allowedWrongAttempts) { 
                setGameState(finishGame("lost"));
                secondsRemaining.current = 0;
            } 
        }
    }

    let gamePlayMode = () => {
        if ( secondsRemaining.current > 1 ) { 
            secondsRemaining.current = secondsRemaining.current - 1;
        } else {
            if (secondsRemaining.current === 1 )  {
                setGameState('lost'); 
            }
                 
            if ( playTimerId.current !== 0  && playTimerId.current !== undefined) {
                clearInterval(playTimerId.current); 
                playTimerId.current = 0;
            }
        }
    }

     useEffect(() => {
            if (gameState === 'ready' && memorizeTimerId.current === undefined) {
               memorizeTimerId.current = setTimeout(() => {
                        setGameState('memorize');
                        recallTimerId.current =  setTimeout(()=> {
                                setGameState('recall');
                                playTimerId.current = setInterval( gamePlayMode, 1000); 
                                }, 2000);
                        }, 2000);

                return function cleanup() {
                      //to clean up after this effect: 
                };
           }
        },[gameState, memorizeTimerId, recallTimerId, playTimerId, secondsRemaining]);
   
    return (
        <div>
            <div>
                <p> Game: Memorize And Recall </p>
            </div>
            <div className="grid">
                {props.matrix.map((row, ri) => (
                    <Row key={ri}>                   
                        {row.map(cellId => 
                             <Cell key={cellId} id={cellId} 
                                    activeCells={props.activeCells} 
                                    recordGuess={recordGuess} 
                                    wrongGuesses = {wrongGuesses}
                                    correctGuesses = {correctGuesses}
                                    gameState = {gameState}
                                     />
                                )}
                    </Row>
                ))}
            </div>
            <div>
                <Footer  playAgain={props.createNewGame}
                        activeCellsCount={props.activeCellsCount}
                        gameState = {gameState}
                        correctGuesses = {correctGuesses}
                        />
            </div>
        
        </div>
    );
}

