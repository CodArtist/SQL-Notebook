import React from 'react'
import Selected_Cell from './Selected_Cell';
import NotSelected_Cell from './NotSelected_Cell';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
export default function Cell(props) {

const [cell_type, setcell_type] = useState(props.cell_type);
const dispatch = useDispatch()

const handle_Cell_Type=(focus_type)=>{
if(focus_type=="focused"){
    setSelected_cellProperties({
        currentState:"Selected_Cell",
        inputDisabled: false,
        status:"Not Executed",
        borderColor:"rgb(67,250,51)",
        submitImage:"play.jpg",
        enableButton: true,
        text:cell_text
    })
}
if(focus_type=="Blured"){
    setSelected_cellProperties({
        currentState:"NotSelected_Cell",
        inputDisabled: false,
        status:"Not Executed",
        borderColor:"black",
        submitImage:"play.jpg",
        enableButton: false,
        text:cell_text
    })
}

}

const handleSubmit= async ()=>{
    var url=`https://sqlnotebook.herokuapp.com/Routes/${cell_text}`;
    if(cell_text.replace(/\s/g, '').length)
    {//***************executing************************ */

         setSelected_cellProperties({
            currentState:"Executing_Cell",
            inputDisabled: true,
            status:"Executing",
            borderColor:"#00F9B4",
            submitImage:"loading.jpg",
            enableButton: true,
            text:cell_text
         })
    //***************executing************************ */
    
    const response =
    await axios.get(url)
    console.log(response)
    if(response.data['code']=='PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR')
    {
        setSelected_cellProperties({
            currentState:"Error_Cell",
            inputDisabled: false,
            status:"No Internet",
            borderColor:"red",
            submitImage:"play.jpg",
            enableButton: true,
            text:cell_text
         })
    }
    else{
    if(response.data["errno"]!=null){
        console.log(response.data);
              setTimeout(()=>{
 
      //***************if error occcured************************ */
     
          setSelected_cellProperties({
            currentState:"Error_Cell",
            inputDisabled: false,
            status:response.data["sqlMessage"],
            borderColor:"red",
            submitImage:"play.jpg",
            enableButton: true,
            text:cell_text
         })
     //***************if error occcured************************ */
       },1000);
    }
    else
    {if(Array.isArray(response.data))
   { 
       console.log("its a table");
console.log(response.data); 
setSelected_cellProperties({
    currentState:"Executed_Cell_With_Table",
    table:response.data,
    inputDisabled: true,
    status:"Query Executed Succesfully",
    borderColor:"lightgreen",
    submitImage:"tickMark.jpg",
    enableButton: true,
    text:cell_text
 })
 console.log("add called")

 props.add();
 dispatch({
    type:'Pdf_Add',
    payload:cell_text
})
 dispatch({
     type:'Pdf_Add',
     payload:response.data
 })
 
} 

   else
   {
    console.log("its a success");
    setSelected_cellProperties({
        currentState:"Executed_Cell",
        inputDisabled: true,
        status:"Query Executed Succesfully",
        borderColor:"lightgreen",
        submitImage:"tickMark.jpg",
        enableButton: true,
        text:cell_text
     })
     props.add();
     dispatch({
        type:'Pdf_Add',
        payload:cell_text
    })
   
}    
}
}
    }
else{
    setSelected_cellProperties({
        currentState:"Error_Cell",
        inputDisabled: false,
        status:"Please Enter Something",
        borderColor:"red",
        submitImage:"play.jpg",
        enableButton: true,
        text:cell_text
     })
}
         }
const onTextChange=(string)=>{
    setcell_text(string.target.value);
}
const [cell_text, setcell_text] = useState("");

const defaultProperies=props.cell_type=='Selected_Cell'?{
    currentState:"Selected_Cell",
    inputDisabled: false,
    status:"Not Executed",
    borderColor:"green",
    submitImage:"play.jpg",
    enableButton: true,
    text:cell_text
}:{
    currentState:"NotSelected_Cell",
    inputDisabled: false,
    status:"Not Executed",
    borderColor:"black",
    submitImage:"play.jpg",
    enableButton: false,
    text:cell_text
}

const [Selected_cellProperties, setSelected_cellProperties] = useState(defaultProperies);


return(
    <Selected_Cell properties={Selected_cellProperties} submit={handleSubmit} onTextChange={onTextChange} handleCellType={handle_Cell_Type} index={props.index} />
)


}
