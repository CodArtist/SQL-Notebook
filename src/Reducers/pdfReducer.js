const pdfReducer=(content=[],action)=>{
switch(action.type){
    case "Pdf_Add":
        content.push(action.payload)
        return(content)
    default:
        return(content)

}
}

export default pdfReducer;