"use client"

import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useEffect, useState } from "react"

/** 
@param {...(string | undefined | boolean | number)} classes conditionaly apply classes
*/
function classNames(...classes: Array<string | undefined | boolean | number>): string{
  return classes.filter(Boolean).join(" ")
}

export default function Page() {
   const data = ["js", "python", 'java', 'php', 'c']

   const [selectedItems, setSelectedItems] = useState([data[0]])

   function handleCheck(event: ChangeEvent<HTMLInputElement>){
    
    event.target.checked = !!event.target.checked;

    if(event.target.checked){
       setSelectedItems([...selectedItems,  event.target.value])
    }
    else{
       setSelectedItems(selectedItems.filter(item => item !== event.target.value))
    }
  }

    function handleClose(e: MouseEvent<HTMLButtonElement, MouseEvent>){
      setSelectedItems(selectedItems.filter(item => item !== e.target.id))
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
            <button id= {item} onClick={(e) => handleClose(e)} className=" relative top-0 right-0 transform translate-x-1/3 px-1 rounded-full text-slate-400 text-sm">&times;</button>
          </span>)
        }
        <button onClick={()=>(setSelectedItems([]))} className=" ml-auto px-1 bg-slate-0  bg-slate-50 rounded-full text-slate-400 text-sm">&times;</button>
              <span className="pointer-events-none inset-y-0 right-0 ml-3 flex items-center pr-0 pl-1">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
        </div>
        <ul className="rounded-md bg-slate-50 px-2 py-2 w-96 mt-2 border shadow-lg ring-1 ring-black ring-opacity-5">
          {data.map(item => {
           return <li className="" key={item}>
            <input className="mr-2 rounded-sm" type="checkbox" checked={selectedItems.includes(item)} id={item} value={item} onChange={(event) => handleCheck(event)} ></input>
            {item}
            </li> 
          })
          }
        </ul>
      </div>
    </>

  )
}