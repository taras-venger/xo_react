import React from 'react';

const cell = props => {
  return (
    <div className='cell' id={props.id} onClick={props.makeMove}>
      {props.player}
    </div>
  );
};

export default cell;
