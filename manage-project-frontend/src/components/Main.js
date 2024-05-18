import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

const URL = "http://localhost:4000"

const Main = (props) => {
  const [tasks, setTasks] = useState(null)

  // get tasks from backend
  const getTasks = async () => {
    const response = await fetch(URL + '/tasks')
    const data = await response.json()
    setTasks(data)
  }

  // create tasks
  const createTasks = async (task) => {
    const response = await fetch(URL + '/tasks' , {
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
    await fetch(URL + `/tasks/${id}` , {
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
    await fetch(URL + `/tasks/${id}` , {
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
        <Route path='/' element={<Index tasks={tasks} createTasks={createTasks} />}/>
        <Route 
          path='/tasks/:id' 
          element={
            <Show 
              tasks={tasks}
              updateTasks={updateTasks}
              deleteTasks={deleteTasks}
            />
          }
        />
      </Routes>
    </main>
  )
}

export default Main