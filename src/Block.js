import React from "react";

const Block=({Node,Event})=>{
    if(Number.isInteger(Node.parent)){
        var [x,y]=Event.getparentpos(Node.parent)
    }else{
        var[x,y]=[Node.positionx,Node.positiony]
    }
    
    return (
        <span>
            <svg height="4000" width="4000">
            <line x1={x+10} y1={y+15} x2={Node.positionx+10} y2={Node.positiony+15} style={{stroke:'rgb(100,100,255)',strokeWidth: "1px"}} />
            </svg>
        <span id='Block' draggable='true'
            style={{left:Node.positionx+'px',top:Node.positiony+'px'}}
            onClick={(e)=>Event.click(Node,e)}
            onMouseOver={()=>console.log(Node)}
            onContextMenu={(e)=>Event.rightclick(e,Node)}
            onDragStart={()=>Event.drag(Node)}
            onDragEnd={()=>Event.dragend()}
        >{Node.text}</span></span>
    )
}
  
  export default Block;