import {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Index from '../pages/Index'
import Show from '../pages/Show'
import Create from '../pages/Create'
import Edit from '../pages/Edit'

// const URL = "http://localhost:4000"

const Main = (props) => {
  const [tasks, setTasks] = useState(null)

  //Authentication
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   () => JSON.parse(localStorage.getItem('auth')) || false
  // );

  // const setAuth = (value) => {
  //   setIsAuthenticated(value);
    
  // };

  // useEffect(()=>{
  //   localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  // }, [isAuthenticated]);




  // get tasks from backend
  const getTasks = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/tasks')
    const data = await response.json()
    setTasks(data)
  }

  // create tasks
  const createTasks = async (task) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/tasks' , {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    const createdTask = await response.json()
    setTasks((prev) => [...prev, createdTask])
  }

  // update tasks
  const updateTasks = async (task, id) => {
    await fetch(process.env.REACT_APP_BACKEND_URL + `/tasks/${id}` , {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    getTasks()
  }

  // delete tasks
  const deleteTasks = async (id) => {
    await fetch(process.env.REACT_APP_BACKEND_URL + `/tasks/${id}` , {
      method: "delete",
    })
    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main>
      <Routes>
        <Route 
          path='/' 
          element={<Index tasks={tasks} createTasks={createTasks} /> }
        />
        <Route 
          path='/tasks/:id' 
          element={<Show tasks={tasks} deleteTasks={deleteTasks} /> }
        />
        <Route
          path='/tasks/:id/edit'
          element={<Edit tasks={tasks} updateTasks={updateTasks} /> }
        />
        <Route 
          path='/create/:status' 
          element={<Create createTasks={createTasks} /> } 
        />
      </Routes>
    </main>
  )
}

export default Main