
import React from 'react';

interface RowProps {
    children: any
}

export const Row:React.FC<RowProps> = (props) => {
    return (
        <div className="row">
             {props.children}
        </div>
    );
}
