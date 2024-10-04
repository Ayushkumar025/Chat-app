import React from 'react'
import './Chat.css'
import { Typewriter } from 'react-simple-typewriter';
import parse from 'html-react-parser';
import {marked} from 'marked';

function Chat({message,loading}) {
  console.log(message);
  return (
    <>
    <ul className='chat-section flex flex-col space-y-4 overflow-y-auto h-[80vh]'>
    {message.map((ele,index)=>(
      <li 
      key={index}
      className={`${ele.role==="user"? "user-data self-end bg-[#2f2f2f] text-white max-w-xl":"chatgpt-data  self-start flex gap-1 items-start w-[85%] text-justify text-white"} p-3 rounded-lg gap-1 `}>
      {ele?.role==="user" ?'':<img src='./images/chat.webp' width={25} height={25} className=' rounded-full shadow-lg'></img>}
      <span>{ele?.content && parse(marked(ele.content))}</span>
      
      </li>

    ))}
    
    {loading&&<span className="loading loading-dots loading-md ml-[15px]"></span>}
    
    </ul>
    {/* <button onClick={()=>setData(data+1)}>Add</button> */}
    </>
  )
}

export default Chat

