import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/login/login';
import Home from './Component/Home/Home';

function App() {
  

  return (
    <>
      <div className='App'>
          <Routes>
            <Route path='/chat' element={<><Home/></>}></Route>
            <Route path='/' element={<><Login/></>}></Route>
          </Routes>
      </div>
    </> 
  )
}

export default App
