import React, {createRef} from 'react'

export default function Add() {
    
    const nemeRef = createRef()
    const locationRef = createRef()
    const moneyRef = createRef()
  
  
  
        const handleSub = (e) => {
          e.preventDefault()
          if(!nemeRef.current.value || !locationRef.current.value|| !moneyRef.current.value) return alert('uzupełnij')
          const obj = {
            name: nemeRef.current.value,
            location: locationRef.current.value,
            money: moneyRef.current.value
          }
          fetch('/api/provide/newData', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
          })
          nemeRef.current.value = ''
          locationRef.current.value = ''
          moneyRef.current.value = ''
        }
    return (
        <div className = 'App'>
        <form onSubmit = {handleSub}>
          <h2>Name</h2>
     <input ref = {nemeRef}/>
      <br/>
      <h2>Location</h2>
      <input ref = {locationRef}/>
      <br/>
      <h2>Money</h2>
      <input ref = {moneyRef}/>
      <br/>
      <button className = 'add'>Add</button>
      </form>
        </div>
    )
}
