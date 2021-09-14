import React from 'react'

export default function ExecutedCellPdf(props) {
   

    return (
        <div style={{height:'90%',paddingBottom:'10px'}}>
        <div style={{width:'100px',fontSize:'7px',fontWeight:'bold',marginTop:'10px',marginBottom:'10px',marginLeft:'50px'}}>
            SQL NoteBook
        </div>
       { props.pdfContent.map((data)=>{
         if(Array.isArray(data)){
             console.log("array")
            var keys= Object.keys(data[0])
            if(keys.length>0){
                var main_keys=[]
                var mod= Math.round(keys.length/5)
                if(mod==0)
                mod=1
                for(var i =0 ;i<mod;i++){
                   main_keys.push(keys.slice(i==0?5*i:5*i+1,  keys.length<5*(i+1) + 1?keys.length:5*(i+1) + 1 ))
                }
                console.log(main_keys)
               return (main_keys.map((main_key)=>{
                    return(
                        <table style={{marginRight:'30px',marginLeft:'50px',marginBottom:'10px',borderCollapse:"collapse",fontSize:'3px',borderRadius:'5px',overflow:"hidden"}}>
                        <thead>
                          <tr >
                            {main_key.map((col)=>{
                              return(
                                <th style={{backgroundColor:'#009879',color:'white',paddingLeft:'3px',
                                paddingRight:'3px',paddingBottom:'3px',paddingTop:'3px'}}>
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
                          {data.map((row)=>{
                           return( 
                
                           <tr style={{backgroundColor:'white',borderBottom:'1px solid #dddddd'}}>
                
                            {main_key.map((key)=>{
                               return(<td >
                                 <div style={{backgroundColor:'white',borderRadius:'5px',
                                paddingLeft:'2px',paddingRight:'2px',paddingBottom:'2px',paddingTop:'2px',
                                boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"}}>
                                 {row[key]==null?"Null":row[key]}
                                 </div>
                                 </td>)
                            })}
                            </tr>
                           )  
                        }
                          )}
                          
                        </tbody>
                      </table>
                    )
                })

        )
            }
              
         
         }
         else{
             if(Object.prototype.toString.call(data) === '[object Object]')
             {
                 return(
                     <div style={{marginLeft:'50px',width:'100px',fontSize:'5px',marginBottom:'10px'}}>
                         {data['heading']}
                         </div>
                 )
             }
             console.log("string")
            return(
                
                <div style={{width:'100px',height:'5px',backgroundColor:'white',paddingLeft:"3px",paddingRight:"3px",paddingTop:"2px",paddingBottom:"2px",borderRadius:"5px",border:`1px dotted #b5f4da`,
                marginLeft:'50px',marginBottom:'10px'// boxShadow:"0px 9px 12px rgba(0,0,0,0.08)"
                }}>
                  <div style={{backgroundColor:"#F3F3F3",height:'100%',width:'98%',borderRadius:"5px"}}>
                  <div style={{fontSize:"3px",marginLeft:'2px'}}>{data}</div>
                  
                  
                  </div>
                  </div>
            )
         }
        })
}
       </div>
        
    )
}
