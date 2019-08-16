import React from 'react';

const Cell = props => {
  return (
    <div className='cell' id={props.id} onClick={props.makeMove}>
      {props.player}
    </div>
  );
};

export default Cell;
