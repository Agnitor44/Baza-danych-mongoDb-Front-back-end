import React, {useState} from 'react'
import {useData} from './Filter'
export default function Mod({mod, setMode}) {

    const [name, setName] = useState(mod.name)
    const [location, setLocation] = useState(mod.location)
    const [money, setMoney] = useState(mod.money)
    const [change, setChange] = useState(false)
    const { ref, kind, setTable, table} = useData()

     const handleChange = (e) => {
         const type = e.target.name
         if(type === 'n') setName(e.target.value)
         if(type === 'l') setLocation(e.target.value)
        else if(type === 'm') setMoney(e.target.value)
        setChange(true)
     }
     const handleSub = (e) => {
         e.preventDefault()
           
        if(!change) return alert('nie wprowadzono zmian')
     
        const obj = {
            id: mod._id,
           name: name,
           location: location ,
           money: money
        }
        console.log(obj)
        fetch('/api/provide/changeData', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
          })
          setMode('')
        

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
    return (
        <div className = "mody">
            
            <form onSubmit = {handleSub}>
            <div  onClick = {() => setMode('')}className = 'up'><h4>Zamknij</h4></div>
            <input name = 'n' onChange = {handleChange} value = {name}/>
            <input name = 'l' onChange = {handleChange} value = {location}/>
            <input name = 'm' onChange = {handleChange} value = {money}/>
            <button>Update</button>
            </form>
        </div>
    )
}
