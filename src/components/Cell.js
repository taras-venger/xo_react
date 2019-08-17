import React from 'react';

const Cell = props => {
  return (
    <div className='cell' data-id={props.id} onClick={props.click}>
      {props.player}
    </div>
  );
};

export default Cell;
