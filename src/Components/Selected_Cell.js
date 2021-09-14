import React from 'react'
import {useState,useEffect} from 'react';
import Executing_Cell from './Executing_Cell';
import MaterialTable from 'material-table';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { Col, Row } from 'reactstrap';
import Lottie from 'react-lottie';
import Executing_anime from './Executing_anime.json';
import Executed_anime from './Executed_anime.json';
import { useDispatch } from 'react-redux';

export default function Selected_Cell(props) {
  const dispatcher = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

let isMobile = (width <=420);
var keys;
  const [focused, setfocused] = useState(true);
  const [table, settable] = useState()
  if(props.properties.currentState=="Executed_Cell_With_Table")
  {
  keys= Object.keys(props.properties.table[0])

    }
    return (
      <div style={{display:'flex',marginLeft:isMobile?'0vmin':'25%',marginRight:isMobile?'10vmin':'25%',marginBottom:!isMobile?'5%':'15%'}}>
    {props.properties.currentState=="Executed_Cell"||props.properties.currentState=="Executed_Cell_With_Table"?
     <div>
 <Lottie 
	    options={{
        loop:false,
        autoplay: true,
        animationData: Executed_anime,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }}}
        height={40}
        width={40}
        />
     </div>
:
        <div onClick={()=>{
          // props.handleCellType("focused");
          props.submit();
      }} style={{width:!isMobile?'10%':'20%',height:!isMobile?'5%':'10%',backgroundColor:'white',borderRadius:'20%',marginRight:'10px',boxShadow:"0px 9px 12px rgba(0,0,0,0.08)",marginTop:'5px'}}>
          {/* <button >submit</button> */}
          {props.properties.currentState=="Executing_Cell"?
          <Lottie 
	    options={{
        loop: true,
        autoplay: true,
        animationData: Executing_anime,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }}}
        height={40}
        width={40}
      />:<img style={{width:'40%',height:'auto',marginTop:'20%',marginLeft:'20%'}}src={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ic_play_arrow_48px.svg/1024px-Ic_play_arrow_48px.svg.png"}/>
}
       </div>
        
}
        
        <div style={{width:'100%',height:'auto'}}>
        <div style={{width:'100%',height:'30px',backgroundColor:'white',paddingLeft:"10px",paddingRight:"10px",paddingTop:"10px",paddingBottom:"12px",borderRadius:"2vmin",border:`2px solid ${props.properties.borderColor}`,
        boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"
        }}>
          <div style={{backgroundColor:"#F3F3F3",height:'100%',width:'98%',paddingLeft:'10px',paddingTop:'0.5%',paddingBottom:'0.5%',borderRadius:"2vmin"}}>
        {/* <h3>{props.properties.currentState}</h3> */}
     <form
     onSubmit={(e)=>{
      e.preventDefault();
      props.submit();
     }}>
          <input type={'text'} size={20} style={{width:"80%",backgroundColor:'rgba(0,0,0,0)',border:"none", outline:"none"}} defaultValue={props.properties.text} disabled={props.properties.inputDisabled}
          autoFocus={true}
          onChange={(string)=>{
            props.onTextChange(string);
         
          }}
          onFocus={()=>{
              props.handleCellType("focused");
              dispatcher({
                type:'Select',
                payload:props.index
              })
              console.log(props.index)
            // setfocused(true);
          }}
          onBlur={()=>{
            props.handleCellType("Blured");

          }}
          />
          </form>
          
          </div>
          </div>
          <h6 style={{color:'rgba(0,0,0,0.47)',position:'relative',top:'0px',fontSize:'10px'}}>Status: {props.properties.status}</h6>
          {props.properties.currentState=="Executed_Cell_With_Table"?
          // <MaterialTable  style={{width:'20%'}} columns={columns} data={props.properties.table}  title='Users Data'
          // search={false} />
          <div style={{marginTop:'50px',backgroundColor:'#F3F3F3',boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"
        ,borderRadius:'20px',overflowX:'scroll',paddingLeft:'10px',
        paddingRight:'10px',paddingBottom:'10px',paddingTop:'10px',marginBottom:'25px'}}>
          <table style={{borderCollapse:"collapse",fontSize:'0.9em',borderRadius:'20px',overflow:"hidden"}}>
            <thead>
              <tr >
                {keys.map((col)=>{
                  return(
                    <th style={{backgroundColor:'#009879',color:'white',paddingLeft:'10px',
                    paddingRight:'10px',paddingBottom:'10px',paddingTop:'10px'}}>
                      {/* <div style={{backgroundColor:'rgb(67,250,51)',borderRadius:'10px',paddingLeft:'10px',
                      paddingRight:'10px',paddingBottom:'10px',paddingTop:'10px',color:'white',boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"}}> */}
                      {col}
                      {/* </div> */}
                      
                      </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {props.properties.table.map((row)=>{
               return( 

               <tr style={{backgroundColor:'white',borderBottom:'1px solid #dddddd'}}>

                {keys.map((key)=>{
                   return(<td >
                     <div style={{backgroundColor:'white',borderRadius:'10px',
                    paddingLeft:'5px',paddingRight:'5px',paddingBottom:'5px',paddingTop:'5px',
                    boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"}}>
                     {row[key]==null||row[key]==""?"Null":row[key]}
                     </div>
                     </td>)
                })}
                </tr>
               )  
            }
              )}
              
            </tbody>
          </table>
        </div>
          :<div></div>
           }
          </div>
      
          </div>
    )
}

