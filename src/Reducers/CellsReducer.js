
const cellsReducer=(cells=new Map(),action)=>{
switch(action.type){
    case "Add":
        {
            // cells=cells.merge(action.payload.cell_data)
        //  cells=temp_cells
        console.log(action.payload.index)
        cells.set(action.payload.index,action.payload.cell_data)
        console.log(cells)
        return(cells)
        }
    case "Delete":
        {var index =action.payload.index
            // cells.splice(index,1)
            // if(cells.size!=0)
          {cells.delete(index)
          }
        //   else
        //   cells= new Map()
            console.log(cells)
            
            return(cells)
        }
    default:
        return(cells)
}
}

const currentCellReducer=(cell_index=0,action)=>{
    switch(action.type){
        case "Select":
            {var index =action.payload
             cell_index=index
            return(cell_index)
            }
        default:
            return(cell_index)
    }
    }



export {cellsReducer,currentCellReducer};