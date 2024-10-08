import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/chat' element={<><Home/></>}></Route>
            <Route path='/' element={<><Login/></>}></Route>
          </Routes>
          </BrowserRouter>
      </div>
    </> 
  )
}

export default App
