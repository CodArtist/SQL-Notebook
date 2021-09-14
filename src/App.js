import './App.css';
import {useState,useEffect,useRef} from 'react';
import Cell from './Components/Cell';
import { useSelector,useDispatch } from 'react-redux';
import HeadingCell from './Components/HeadingCell';
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import ExecutedCellPdf from './ExecutedCellPdf';

const doc = new jsPDF();



function App() {
 
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
const redux_cells= useSelector(state=>state.cellsReducer)
const Selected_cell_index=useSelector(state=>state.currentCellReducer)
const pdfContent=useSelector(state=>state.pdfReducer)
const [cells, setcells] = useState([])
const dispatch = useDispatch()
useEffect(() => {
 add()
}, [])


function delete_cell(){
  console.log(Selected_cell_index);
dispatch({
  type:'Delete',
  payload:{
    index:Selected_cell_index
  }
})
get_cells()

}
function add(){
 
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

var id=makeid(10);



dispatch({
  type:'Add',
  payload:{
    cell_data:<Cell cell_type={"NotSelected_Cell"} add={add} index={id} />,
    index:id
   }
})
get_cells()

}

function addHeading(){
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

var id=makeid(10);

  dispatch({
    type:'Add',
    payload:{
      cell_data:<HeadingCell add={add} index={id}/>,
      index:id
    }
  })
  get_cells()
}


const styles={backgroundColor:'white',marginLeft:'10%',marginRight:'10%',
             borderRadius:'20px', boxShadow:"0px 9px 12px rgba(0,0,0,0.02)"}
function get_cells(){
  var tempcells=[]
  redux_cells.forEach(function(value, key) {
    tempcells.push(value)
  })
  setcells(tempcells)

}
const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [15,20]
};
const save = () => {


if(pdfContent.length!=0)
 { doc.html(ReactDOMServer.renderToStaticMarkup(<ExecutedCellPdf pdfContent={pdfContent}/>),
  {
    callback: () => {
      doc.save("myDocument.pdf");
    }
  }
  );
}
else{
  alert("Please write Something in the NoteBook")
}
}
const ref=useRef()
  return (
    <div style={{backgroundColor:'#F9F9F9',height:'98vh',paddingTop:'10px',overflowY:'scroll'}} >
      <h1 style={{marginLeft:'20px',fontWeight:'bold',color:'black',marginBottom:'20px'}} >SQL Notebook</h1>
    <div>
      <div style={Object.assign(styles,{paddingLeft:'20px',paddingRight:'20px',paddingTop:'20px',paddingBottom:'20px',marginBottom:'20px'})}>
<div style={{display:'flex'}}>
      <div style={{marginLeft:isMobile?'10px':'20px',cursor:'pointer',fontSize:isMobile?'12px':'15px'}}  onClick={()=>{
          add()
      }}>Add</div>
    
       <div style={{marginLeft:'20px',cursor:'pointer',fontSize:isMobile?'12px':'15px'}} onClick={()=>{
          delete_cell()
      }}>Delete</div>
      <div style={{marginLeft:'20px',cursor:'pointer',fontSize:isMobile?'12px':'15px'}} onClick={()=>{
          addHeading()
      }}>Heading</div>
      <div style={{marginLeft:'20px',cursor:'pointer',fontSize:isMobile?'12px':'15px'}} onClick={()=>{
          save()
      }}>Download</div>
       
        
      </div>

      </div>
      <div style={!isMobile?styles:{}} ref={ref}>
       {
       cells   
      }
      </div>
    </div>
    </div>
  );
}

export default App;
