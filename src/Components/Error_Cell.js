import React from 'react'

export default function Error_Cell(props) {
    return (
        <div>
        <h3>Error_Cell</h3>
          <input onChange={()=>{console.log(props.value)}} defaultValue={props.value}/>
        </div>
    )
}
