import React from 'react'
import { useEffect,useState } from 'react'
import OpenAI from "openai";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Chat from '../Chat';
import { IoIosSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";
import { BrowserRouter, Link, Route, Routes,useNavigate } from "react-router-dom";
import './Home.css'
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth,provider} from '../../FirebaseConfig';
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

function Home() {
    const [count, setCount] = useState("");
    const [message,setmessage]=useState([{ role: "system", content: "Hi there! Ready to explore?" }]);
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
    
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); 
            } else {
                setUser(null); 
            }
            });
        
            return () => unsubscribe();
        }, [auth]);
        
        const handleLogout = () => {
            signOut(auth).then(() => {
            navigate('/');
            }).catch((error) => {
            console.error("Error logging out:", error);
            });
          };

  // const [data,setData]=useState(0)
    console.log("count",count);
    
    const chatOpenAi=async()=>{
    if (!count) return Swal.fire({
        title: 'Warning',
        text: 'Please enter your prompt',
        icon: 'warning',
        confirmButtonText: 'ok'
    })
    setLoading(true)
    message.push({role: "user", content: count,})
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: message,
      // [
      //     { role: "system", content: "You are a helpful assistant." },
      //     {
      //         role: "user",
      //         content: "what is mern",
      //     },
      // ],
    });
    message.push(completion.choices[0].message)
    console.log(completion.choices[0].message);
    setmessage([...message])
    setLoading(false)
    setCount("");
    }
    // Handle keydown event
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        setCount(''); // Clear the input after the action
        }
    };
    return (
        <>
            <section className='mychatsection'>
            {user ? (
            <div className="text-white hover:underline float-right">
                <img src={user.photoURL} className="rounded-full w-10 h-10 mr-2" alt="User Profile" />
                <button onClick={handleLogout} className='hover:underline'>Logout</button>
                </div>
            ) : (
                <div className="text-white hover:underline float-right">
                <a href='#'>
                    <Link to='/Login'>Sign in</Link>
                </a>
                </div>
                )}
        <div className='head flex justify-center items-center gap-1'>
            <div className="text-[#ffffff] font-bold text-2xl">QuickChat</div>
            <div className='img'><img src='./images/chat.webp' width={25} height={25} className=' rounded-full shadow-lg'></img></div>
        </div>
        <section>
            <Chat message={message} loading={loading}
            />
        </section>
            <div className='chatinput'>
            <button className='attach'><CgAttachment size={22} /></button>
            <input type='text' value={count} onChange={(e)=>setCount(e.target.value)} onKeyDown={handleKeyDown} placeholder='Message QuickChat' className='w-72 p-2 bg-[#2F2F2F] text-[#ffffff] text-center text-lg rounded-lg shadow-lg'></input>
            <button onClick={chatOpenAi} className='ml-3' ><IoIosSend size={30} /></button>
            </div>
        </section>
        </>
    )
}

export default Home
