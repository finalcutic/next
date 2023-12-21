"use client"

import { ChangeEvent, useEffect, useState } from "react"

export default function Page() {
   const data = ["js", "python", 'java', 'php', 'c']

   const [selectedItems, setSelectedItems] = useState([data[0]])

   function handleCheck(event: ChangeEvent<HTMLInputElement>){
    if(event.target.checked){
       setSelectedItems([...selectedItems,  event.target.value])
    }
    else{
       setSelectedItems(selectedItems.filter(item => item !== event.target.value))
    }
    
   } 
  return (
    <>
      <h1>There are my components</h1>
      <br></br>
      <h2>Select component:</h2>
      <div>
        <div className="flex h-8 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">{
          selectedItems.map(item => <span className=" inline-flex items-center mx-1 rounded-full px-2 py-1 text-xs bg-gray-100 text-gray-500" key={item}>
            {item}
            <button className=" relative top-0 right-0 transform translate-x-1/3 px-1 rounded-full text-slate-400 text-sm">&times;</button>
          </span>)
        }
        <button className=" ml-auto px-1 bg-slate-0  bg-slate-50 rounded-full text-slate-400 text-sm">&times;</button>
        </div>
        <ul>
          {data.map(item => {
           return <li key={item}>
            <input type="checkbox" id={item} value={item} onChange={(event) => handleCheck(event)} ></input>
            {item}
            </li>
          })
          }
        </ul>
      </div>
    </>

  )
}