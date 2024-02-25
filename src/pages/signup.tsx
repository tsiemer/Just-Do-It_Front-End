import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  function handleInputChange(e: any){
    switch(e.target.id){
      case 'firstName':
        setFirstName(e.target.value);
      break;
        
      case 'lastName':
        setLastName(e.target.value);
      break;
      
      case 'email':        
        setEmail(e.target.value);
      break;
      
      case 'password':
        setPassword(e.target.value);
      break;
      
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
      break;
    }
  }

  function checkInputs(){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordCheck:boolean = password !== null && password.length > 8; 

    if(!firstName){
      setMsgType("firstName");
      return setErrorMsg("Please provide a first name.");
    } else if (!re.test(email)){
      setMsgType("email");
      return setErrorMsg("Email does not match standards.");
    } else if (!passwordCheck){
      setMsgType("password");
      return setErrorMsg("Password needs to be greater than 8 characters.");
    } else if (confirmPassword != password){
      setMsgType("confirmPassword");
      return setErrorMsg("Passwords need to match.");
    }

    setErrorMsg("");
  }

  function submitFormData(e: any){
    e.preventDefault();

    checkInputs();

    axios.post('http://localhost:3000/signup', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
    .then(function (response) {
      console.log("Axios response data: ", response);
    })
    .catch(function (error) {
      console.log("Axios error data: ", error);
    });
  }

  return (
    <div className="container mx-auto mt-20">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Sign Up</h1>
      <div className="mx-auto my-auto">
        <form onSubmit={(submitFormData)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input value={firstName} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="firstName" type="text" placeholder="First Name" autoComplete='given-name'/>
              {msgType == "firstName" ? errorMsg : ""}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Last Name
              </label>
              <input value={lastName} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" type="text" placeholder="Last Name" autoComplete='family-name'/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input value={email} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Email" autoComplete='email'/>
              {msgType == "email" ? errorMsg : ""}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input value={password} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="Password" autoComplete='off'/>
              {msgType == "password" ? errorMsg : ""}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Confirm Password
              </label>
              <input value={confirmPassword} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="confirmPassword" type="password" placeholder="Confirm Password" autoComplete='off'/>
              {msgType == "confirmPassword" ? errorMsg : ""}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
            <p>Already have an account? <Link className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline" to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
