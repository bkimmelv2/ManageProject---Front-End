import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Show = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const task = props.tasks?.find((p) => p._id === params.id)

  const [updateForm, setUpdateForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dateCreated: task?.dateCreated || '',
    dateDue: task?.dateDue || '',
    status: task?.status || '',
  })

  if (!task) {
    return <div>Task not found</div>
  }

  const handleChange = (event) => {
    setUpdateForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.updateTasks(updateForm, params.id)
  }

  const handleDelete = () => {
    props.deleteTasks(params.id)
    navigate('/')
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <h2>{task.description}</h2>
      <h2>Date created: {task.dateCreated}</h2>
      <h2>Date due: {task.dateDue}</h2>
      <h2>Status: {task.status}</h2>
      <br/>

      <button onClick={handleDelete}>
        Delete Task
      </button> 
      <br/> <br/> <br/>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={updateForm.title}
          name='title'
          placeholder={task.title}
          onChange={handleChange}
        /> <p>'Task' Required</p>
        <input
          type='text'
          value={updateForm.description}
          name='description'
          placeholder={task.description}
          onChange={handleChange}
        /> <p>'Description' Optional</p>
        <input
          type='text'
          value={updateForm.dateCreated}
          name='dateCreated'
          placeholder={task.dateCreated}
          onChange={handleChange}
        /> <p>'Date Created' Required</p>
        <input
          type='text'
          value={updateForm.dateDue}
          name='dateDue'
          placeholder={task.dateDue}
          onChange={handleChange}
        /> <p>'Date Due' Required</p>
        <select
          value={updateForm.status}
          name='status'
          onChange={handleChange}
        >
          <option value='' disabled>Select status</option>
          <option value='To Do'>To Do</option>
          <option value='Doing'>Doing</option>
          <option value='Done'>Done</option>
        </select> <p>Required</p>
        <input type="Submit" value="Update Task" />
      </form>
    </div>
  )
}

export default Show