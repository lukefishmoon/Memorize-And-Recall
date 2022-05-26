import React, { useState } from 'react';
import lodash from 'lodash';

import { Game } from './Game';
function generateMatrix(rows = 5, columns = 5) {
    let matrix: string[][] = [], row;
    for (let r = 0; r <  rows; r++) {
        row = [];
        for (let c = 0; c <  columns; c++) {
            row.push(`${r}${c}`);
        }
        matrix.push(row);
    }
    return matrix;
}

function generateActiveCells(matrix:string[][], count:number) {
    let flatMatrix = lodash.flatten(matrix); 
    return lodash.sampleSize(flatMatrix, count);
}

interface ContainerProps {
}

const Container: React.FC<ContainerProps> = (props) => {
    let  activeCellsCount = 6;
    const [gameId, setGameId] = useState(1);
    const [activeCells, setActiveCells] = useState<Array<String>>(generateActiveCells(generateMatrix(),activeCellsCount));

    let createNewGame = () => { 
        setGameId(gameId + 1); 
        let matrix = generateMatrix();
        setActiveCells(generateActiveCells(matrix,activeCellsCount));
    }
 
    return (
        <div>
            <Game   key={gameId} 
                    createNewGame={createNewGame} 
                    activeCellsCount={activeCellsCount} 
                    allowedWrongAttempts = {2}
                    timeoutSeconds =  {10}   
                    activeCells = {activeCells}
                    matrix = {generateMatrix()} />                   
        </div>
    );
}

export default Container;