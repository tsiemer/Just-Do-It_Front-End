import { Navigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';


export default function Login({ user, setUser }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleInputChange(e: any){
    switch(e.target.id){
      case 'email':        
        setEmail(e.target.value);
      break;
      
      case 'password':
        setPassword(e.target.value);
      break;
    }
  }

  function submitFormData(e: any){
    e.preventDefault();
    
    axios.post('http://localhost:3000/login', {
      email: email,
      password: password
    },{ 
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    })
    .then(function (response) { 
      setUser(response.data);
    })
    .catch(function (error) {
      console.log("Axios error data: ", error);
      // Set error messages here with returned error
    });
  }

  return (
    <div className="container mx-auto mt-20">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Login</h1>
      <div className="mx-auto my-auto">
        <form onSubmit={submitFormData} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input value={email} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Email" autoComplete="email"/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input value={password} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="Password" autoComplete="off"/>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>

        { user !== null ? <Navigate to="/tasks"/> : ""}
      </div>
    </div>
  )
}
  