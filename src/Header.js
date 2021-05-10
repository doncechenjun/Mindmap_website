const Header =()=>{

    function navclose(){
        document.getElementById('navbar').style.display = "none"
    }
    return (
        <div id='header'>
            <ul id='navbar'>
                <li><a  onClick={()=>navclose()}>close</a></li>
                <li><a href="./#save" onClick={()=>navclose()}>Save</a></li>
                <li><a href="./#Load" onClick={()=>navclose()}>Load</a></li>
                <li><a href="./#about" onClick={()=>navclose()}>About</a></li>
            </ul>
            <a  onClick={()=>{document.getElementById('navbar').style.display = "block"}}><img src='./select_btn.png' alt='select here' height='20vh' style={{margin:'0px 20px'}}/></a>
            <h1 style={{display:'inline' ,margin:'0px 20px'}}>mindmap</h1>
        </div>
    )}

export default Header