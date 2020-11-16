import React, {useState, createRef, createContext, useContext, useEffect} from 'react'
import Pokaz from './Pokaz'


const Data = createContext()
export const useData = () => {
    return useContext(Data)
}

export default function Filtr() {
    const [active, setActive] = useState(false)
    const [kind, setKind] = useState('location')
    const [table, setTable] = useState([])
    const [props, setProps] = useState({})
  
    const filtrRef = createRef()
    const choose = (e) => {
        setKind(e.target.value)
    }
  
    const handleSub = async(e) => {
        e.preventDefault()
        
      
        try {
            await
          
        fetch('/api/database').
        then(data => data.json()).
        then(data => {
           

            if(kind === 'name')
            {
              const newData =  data.filter(item => item.name === filtrRef.current.value)
              setProps({
                ref: filtrRef.current.value,
                kind: kind,
                setTable: setTable,
                table: table
            })
              return setTable(newData)
            }
            else if(kind === 'location')
            {
                
                const newData =  data.filter(item => item.location === filtrRef.current.value)
                setProps({
                    ref: filtrRef.current.value,
                    kind: kind,
                    setTable: setTable,
                    table: table
                })
                return setTable(newData)
            }
            else if(kind === 'money')
            {
                const newData =  data.filter(item => item.money === filtrRef.current.value)
                setProps({
                    ref: filtrRef.current.value,
                    kind: kind,
                    setTable: setTable,
                    table: table
                })
                return setTable(newData)
            }
        
           
        }) } catch {console.log('błąd')}
      
    }
 
    return (
       active?
       <Data.Provider value = {props}>
       <div>
            <select className = 'select' onChange = {choose}>
               
                <option value="location">location</option>
                <option value="money">money</option>  
                <option value="name">name</option>  
            </select>
            {kind ? 
                <form onSubmit = {handleSub}>
                    <input ref = {filtrRef}/>
                    <br/>
                  <button className = 'sr'>Szukaj</button> 
                </form>
                :
                null
            }
           <button className = 'filtr' onClick = {() => setActive(prev => !prev)}>Zamknij</button>
           <Pokaz value = {table} setValue = {setTable}/>
       </div>
       </Data.Provider>
       :
       <button className = 'filtr' onClick = {() => setActive(prev => !prev)}>Filtr</button>
    )
}
