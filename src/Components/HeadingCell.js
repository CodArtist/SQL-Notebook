import {useState,React} from 'react'
import { useDispatch } from 'react-redux';

export default function HeadingCell(props) {
    const [text, settext] = useState('# Write Your Heading')
    const dispatcher = useDispatch();

    const [isSubmitted, setisSubmitted] = useState(false)
    return (
        !isSubmitted?
        <div style={{width:'100%',height:'30px',backgroundColor:'white',paddingLeft:"10px",paddingRight:"10px",paddingTop:"10px",paddingBottom:"12px",borderRadius:"2vmin",border:`2px solid ${'green'}`,
        boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"
        }}>
          <div style={{backgroundColor:"#F3F3F3",height:'100%',width:'98%',paddingLeft:'10px',paddingTop:'0.5%',paddingBottom:'0.5%',borderRadius:"2vmin"}}>
        {/* <h3>{props.properties.currentState}</h3> */}
     <form
       onSubmit={(e)=>{
        e.preventDefault();
        setisSubmitted(true)
        props.add()
        dispatcher({
          type:'Pdf_Add',
          payload:{heading:text}
        })
        
      }}>
          <input type={'text'} size={20} style={{width:"80%",backgroundColor:'rgba(0,0,0,0)',border:"none", outline:"none"}} defaultValue={text}
          autoFocus={true}
          onFocus={()=>{
            dispatcher({
              type:'Select',
              payload:props.index
            })}}
          onChange={(string)=>{
              settext(string.target.value)
          }}
          
        
          />
          
          </form>
          </div>
          </div>:
          <h1>{text}</h1>
    
    )
}
