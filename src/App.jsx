import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';

function App() {
  

  return (
    <>
      <div className='App'>
          <Routes>
            <Route path='/Home' element={<><Home/></>}></Route>
            <Route path='/' element={<><Login/></>}></Route>
          </Routes>
      </div>
    </> 
  )
}

export default App
