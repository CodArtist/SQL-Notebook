import React from 'react'

export default function Executing_Cell(props) {
    return (
        <div>
        <h3>Executing_Cell</h3>
          <input disabled={true} defaultValue={props.value}/>
        </div>
    )
}
