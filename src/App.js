import './App.css';
import Header from './Header';
import Blocks from './Blocks';
import {useState,useRef, useEffect} from 'react';


const App=()=>{
  //nodeTemplete={'index':0,'parent':0,'text':'','positionx':0,'positiony':0};
  const [Nodes,setNodes]=useState([
    {'index':0,'parent':null,'text':'type something','positionx':20,'positiony':40},
  ])
  const [name,setname]=useState('')
  const [clickNode,setclickNode]=useState(0)
  useEffect(()=>{
		document.addEventListener('click',()=>menuRef.current.style.display='none');
	})
  const inputref=useRef();
  const editref=useRef();
  const menuRef = useRef();
  

  
  

  const nodeEvent={
    'add':(newNode)=>{setNodes([...Nodes,newNode])},
    'delete':(index)=>{setNodes(Nodes.filter((Node)=>Node.index !== index))},
    'find':(i)=>{var pos=i;
                return function(Node) {
                return Node.index===pos
              }},
    'edittext':(index,text)=>{Nodes.find(nodeEvent.find(index)).text=text;},
    'editpos':(index,posx,posy)=>{
      Nodes.find(nodeEvent.find(index)).positionx=posx;
      Nodes.find(nodeEvent.find(index)).positiony=posy;},
  }
  const Event={
    'click':(Node,e)=>{
      setclickNode(Node);
      inputref.current.style.display='block'
		  inputref.current.style.left=e.pageX + 'px';
		  inputref.current.style.top=e.pageY + 'px';
      inputref.current.focus();
    },
    'rightclick':(e,Node)=>{
      setclickNode(Node);
      e.preventDefault();
		  menuRef.current.style.display='block';
		  menuRef.current.style.left=e.pageX + 'px';
		  menuRef.current.style.top=e.pageY + 'px';
      console.log(clickNode);
    },
    'mouseover':(object)=>{console.log(object)},
    'drop':(e)=>{
      e.preventDefault();
      nodeEvent.editpos(clickNode.index,e.clientX-50,e.clientY-85);
    },
    'allowdrop':(e)=>{e.preventDefault()},
    'drag':(Node)=>{
      setclickNode(Node);
    },
    'dragend':()=>{
      setclickNode('');
    },
    'getparentpos':(index)=>{
      return [Nodes.find(nodeEvent.find(index)).positionx,Nodes.find(nodeEvent.find(index)).positiony]
    }
  };
  const inputEvent={
    'change':(e)=>{setname(e.target.value)},
    'blur':()=>{
      if(!name){inputref.current.style.display='none'; return}
      inputref.current.style.display='none';
      var newNode={'index':Nodes[Nodes.length-1].index+1,
                  'parent':clickNode.index,
                  'text':name,
                  'positionx':clickNode.positionx+80,
                  'positiony':clickNode.positiony};
      nodeEvent.add(newNode);
      setname('')
    },
    'keydown':(e)=>{
      if(e.keyCode === 13) {
        inputref.current.blur();
        inputEvent.blur();
      }
    },
  }
  const editEvent={
    'click':(e)=>{
      editref.current.style.display='block'
      editref.current.style.left=e.pageX + 'px';
		  editref.current.style.top=e.pageY + 'px';
      editref.current.focus();
    },
    'change':(e)=>{setname(e.target.value)},
    'blur':()=>{
      if(!name){editref.current.style.display='none'; return}
      editref.current.style.display='none';
      nodeEvent.edittext(clickNode.index,name)
      setname('')
    },
    'keydown':(e)=>{
      if(e.keyCode === 13) {
        editref.current.blur();
        editEvent.blur();}},
  }
  return (
    <div id='whole'>
      <Header/>
      <div id='map' onDrop={(e)=>Event.drop(e)} onDragOver={(e)=>Event.allowdrop(e)}>
        <p id='syn'>left click for adding block, right ckick for editing and deleting
        <br/> drag the block to position 
        </p>
        <div id='empty'>
          <Blocks Nodes={Nodes} Event={Event}/>
        </div>
      </div>

      <ul id='menu' ref={menuRef} style={{display:'none'}}>
        <li onClick={()=>nodeEvent.delete(clickNode.index)}>delete</li>
        <li onClick={(e)=>editEvent.click(e)}>edit</li>
      </ul>

      <input 
        type='text'
        placeholder='New Node'
        style={{display:'none',position:'absolute'}} 
        ref={inputref} 
        value={name} 
        onChange={(e)=>inputEvent.change(e)}
        onBlur={()=>inputEvent.blur()}
        onKeyDown={(e)=>inputEvent.keydown(e)}
      ></input>
      
      <input 
        type='text'
        placeholder='Edit Node'
        style={{display:'none',position:'absolute'}} 
        ref={editref} 
        value={name} 
        onChange={(e)=>editEvent.change(e)}
        onBlur={()=>editEvent.blur()}
        onKeyDown={(e)=>editEvent.keydown(e)}
      ></input>
    </div>

  )
}

export default App;
