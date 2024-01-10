"use client"

import { ChevronUpDownIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useEffect, useState } from "react"
import { GreyButton, RedButton } from "./Button";

/** 
@param cssclasses
*/
function classNames(...classes: Array<string | undefined | boolean | number>): string{
  return classes.filter(Boolean).join(" ")
}

export default function Page() {
   const data = ["js", "python", 'java', 'php', 'c']

   const [selectedItems, setSelectedItems] = useState([data[0]])
   const [isListOpen, setIsListOpen] = useState(false)

   function handleCheck(event: React.MouseEvent, selectedItem: string){

    event.stopPropagation()
    console.log(event.currentTarget)

    if(!selectedItems.includes(selectedItem)){
       setSelectedItems([...selectedItems,  selectedItem])
    }
    else{
       setSelectedItems(selectedItems.filter(item => item !== selectedItem))
    }
  }

  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    const targetId = e.currentTarget.id
  
    if (targetId) {
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item !== targetId.toString())
      );
    }
  }
    
   
  return (
    <>
      <h1>There are my components</h1>
      <br></br>
      <h2>Select component:</h2>
      <div>
        <div onClick={(event)=>{ event.stopPropagation(); console.log("onClick warks"); setIsListOpen(prev=>!prev);}} className="flex h-8 w-96 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">{
          selectedItems.map(item => <span className=" inline-flex items-center mx-1 rounded-full px-2 py-1 text-xs bg-gray-100 text-gray-500" key={item}>
            {item}
            <button id= {item} onClick={(e) => handleClose(e)} className=" relative top-0 right-0 transform translate-x-1/3 px-1 rounded-full text-slate-400 text-sm">&times;</button>
          </span>)
        }
        <button onClick={()=>(setSelectedItems([]))} className=" ml-auto px-1 bg-slate-0  bg-slate-50 rounded-full text-slate-400 text-sm">&times;</button>
              <span className="pointer-events-none inset-y-0 right-0 ml-3 flex items-center pr-0 pl-1">
                {isListOpen?<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                 :<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
              </span>
        </div>
        <ul className={classNames(!isListOpen ? " hidden ":"rounded-md bg-slate-50 px-2 py-2 w-96 mt-2 border shadow-lg ring-1 ring-black ring-opacity-5")}>
          {data.map(item => {
           return <li onClick={(event) => handleCheck(event, item)} value={item} className="hover:bg-slate-200" key={item}>
            <input className="mr-2 rounded-sm" type="checkbox" checked={selectedItems.includes(item)} id={item} value={item} ></input>
            {item}
            </li> 
          })
          }
        </ul>
      </div>
      <br></br>
      <h2>Blue button component:</h2>
      <GreyButton/>
      <br></br>
      <h2>Red button component:</h2>
      <RedButton/>
      
    </>

  )
}