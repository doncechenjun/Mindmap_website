import {useState , useEffect} from 'react';

const useMousePosition = ()=>{
    const [MousePosition,setMousePosition]=useState({x:null,y:null});

    const updateMousePosition = ev=>{
        setMousePosition({x:ev.clientX, y:ev.clientY});
    }

    useEffect(()=>{
        window.addEventListener('mousedown',updateMousePosition);
        return ()=>window.removeEventListener('mousedown',updateMousePosition);
    },[]);
    return MousePosition;
}


export default useMousePosition