import React, {useState, createRef} from 'react'
import Mod from './Mod'
import {useData} from './Filter'
export default function Pokaz({value, setValue}) {
    const [mod, setMode] = useState('')
    const { ref, kind, setTable, table} = useData()
    const handleSub = (id, e) => {
        e.preventDefault()

        const obj = {
                    id: id
                }
        
                fetch('/api/provide/deleteData', {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(obj)
                  })



                  fetch('/api/database').
                  then(data => data.json()).
                  then(data => {
                      
          
                      if(kind === 'name')
                      {
                        const newData =  data.filter(item => item.name === ref)
                        console.log('refresh')
                        return setTable(newData)
                      }
                      else if(kind === 'location')
                      {
                          const newData =  data.filter(item => item.location === ref)
                         console.log('refresh')
                          return setTable(newData)
                      }
                      else if(kind === 'money')
                      {
                          const newData =  data.filter(item => item.money === ref)
                          console.log('refresh')
                          return setTable(newData)
                      }
                   
                     
                  })
         
    }
    const Handleupdate = (item) => {
        setMode(item)
    }
 
    return (
        mod?
       <Mod mod = {mod} setMode = {setMode}/>
        :
        <div>
            {value.map(item => {
                return (
                <div>

                     <section className = 'wyniki'>
                  <form onSubmit = {handleSub.bind(this, item._id)}>
                      <div className = 'part'>
                      <h3>Name</h3>
                     <p>{item.name}</p>
                     </div>
                     <div className = 'part'>
                     <h3>Location</h3>
                    <p>{item.location}</p> 
                    </div> 
                    <div className = 'part'>
                    <h3>Money</h3>
                    <p>{item.money}</p>
                    </div>
                   



                    <div onClick = {Handleupdate.bind(this, item)} className = 'update'><h4>Update</h4></div>

                    <button>Delete</button>

                    </form>  
                    
                    </section>
                </div>)
            })}
        </div>
    )
}
