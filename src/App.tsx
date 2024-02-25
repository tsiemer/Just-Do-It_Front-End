import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './index.css'

// Page Imports
import Home from './pages/home';
import Signup from './pages/signup';
import Navigation from './components/navigation';
import Login from './pages/login';
import Tasks from './pages/tasks';

import axios from 'axios';
import PrivateRoute from './components/privateRoute';

function App() {
  const [user, setUser] = useState(null);

  function handleLogout(){
    axios.post('http://localhost:3000/logout', {
      user: user
    },{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    });
    
    setUser(null);
  }
  
  useEffect(() => {
    if(!user){
      axios.get('http://localhost:3000/')
      .then(function (response) {
        if(response.data.isAuthenticated){
          console.log("Response: ", response.data.user)
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(function (error) {
        console.log("Error: ", error)
      });
    }
  });

  return (
    <div>
      <Navigation data={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
        <Route path='/tasks' element={<PrivateRoute isAuthenticated={user}><Tasks user={user}></Tasks></PrivateRoute>}/>
        <Route path='/logout' element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  )
}

export default App
