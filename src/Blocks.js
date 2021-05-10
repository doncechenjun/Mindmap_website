import Block from './Block'

const Blocks=({Nodes,Event})=>{
    return(
            Nodes.map((Node) => {
                return <Block Node={Node} Event={Event}/>
    }))}

export default Blocks