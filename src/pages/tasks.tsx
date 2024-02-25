import { useState } from 'react';
import TaskItem from '../components/taskItem';

import axios from 'axios';

function Tasks({ user }) {
  const [tasks, setTasks] = useState();
  
  const [name, setName] = useState();
  const [notes, setNotes] = useState();
  const [dueDate, setDueDate] = useState();

  const [msgType, setMsgType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleInputChange(e: any){
    switch(e.target.id){
      case 'name':        
        setName(e.target.value);
      break;
      
      case 'notes':
        setNotes(e.target.value);
      break;
      
      case 'dueDate':
        setDueDate(e.target.value);
      break;
    }
  }

  function submitFormData(e: any){
      e.preventDefault();
      
      axios.post(`http://localhost:3000/tasks`, {
          name: name,
          notes: notes, 
          dueDate: dueDate,
          userId: user.id,
          folderId: null
      },{ 
      headers: {
        'Content-Type': 'application/json'
      },
        withCredentials: true 
      })
      .then(function (response) {  
        console.log("Tasks Submitted: ", response.data);
          setTasks(response.data);
      })
      .catch(function (error) {
          console.log("Axios error data: ", error);
      });
  }

  function getTaskData(){
    axios.get('http://localhost:3000/tasks',{
      params: {
        userId: user.id
      }
    })
    .then(function (response) {
      setTasks(response.data);
    })
    .catch(function (error) {
      setTasks(null)
      console.log("Error: ", error)
    });
  }

  !tasks ? getTaskData() : null;

  return (
    <div className="container mx-auto mt-20">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Hello {user.firstName}</h1>
      
      <div className="mx-auto my-auto">
        
        <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
          { tasks ?
            tasks.map((task) => {
              return <TaskItem key={task.uid} task={task}></TaskItem>
            })
            : <p>There are no tasks currently, please create one.</p>
          }
        </ul>

        <form onSubmit={submitFormData} className="bg-white rounded pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Name
            </label>
            <input value={name} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder="Name" autoComplete="off"/>
            {msgType == name ? errorMsg : ""}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Notes
            </label>
            <textarea value={notes} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="notes" placeholder="Notes" autoComplete='off'/>
            {msgType == notes ? errorMsg : ""}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Due Date
            </label>
            <input value={dueDate} onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dueDate" type="date" placeholder="Due Date" autoComplete='off'/>
            {msgType == dueDate ? errorMsg : ""}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tasks;
