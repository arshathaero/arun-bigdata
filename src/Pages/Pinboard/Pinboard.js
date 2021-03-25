import React from 'react'

import Draggable, {DraggableCore} from 'react-draggable';



const Pinboard= () =>{
    return (
        <div style={{height:'80vh'}}>
<Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={(e)=>console.log(e)}
        onDrag={(e)=>console.log(e)}
        onStop={(e)=>console.log(e)}>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
        </div>
    )
}


export default Pinboard