import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

const URL = "http://localhost:4000/tasks"

const Main = (props) => {
  const [tasks, setTasks] = useState(null)

  //getTasks from backend 
  const getTasks = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setTasks(data)
  }

  //createTasks
  const createTasks = async (task) => {
    const response = await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    const createdTask = await response.json()
    setTasks((prev) => [...prev, createdTask])
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main>
      <Routes>
        <Route path='/' element={<Index tasks={tasks} createTasks={createTasks} />}/>
        <Route path='/tasks/:id' element={<></>}/>
      </Routes>
    </main>
  )
}

export default Main