import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/login/login';
import Home from './Component/Home/Home';
import {auth,provider} from './FirebaseConfig';
import { useState } from 'react'
import { signInWithPopup, signOut } from 'firebase/auth';
import { GithubAuthProvider } from "firebase/auth";
function App() {
  const [user, setUser] = useState(null);

  const provider = new GithubAuthProvider();

    const signInWithGithub = async () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GithubAuthProvider.credentialFromError(error);
                    // ...
                });
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

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
