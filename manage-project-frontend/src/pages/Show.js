import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Show = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const task = props.tasks.find((p) => {
    return p._id === params.id
  })

  const [updateForm, setUpdateForm] = useState({
    title: task.title,
    description: task.description,
    dateCreated: task.dateCreated,
    dateDue: task.dateDue,
    status: task.status
  })

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
      <h2>{task.dateCreated}</h2>
      <h2>{task.dateDue}</h2>
      <h2>{task.status}</h2>
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
        /> <p>Required</p>
        <input
          type='text'
          value={updateForm.description}
          name='description'
          placeholder={task.description}
          onChange={handleChange}
        /> <p>Optional</p>
        <input
          type='text'
          value={updateForm.dateCreated}
          name='dateCreated'
          placeholder={task.dateCreated}
          onChange={handleChange}
        /> <p>Required (MM-DD-YYYY)</p>
        <input
          type='text'
          value={updateForm.dateDue}
          name='dateDue'
          placeholder={task.dateDue}
          onChange={handleChange}
        /> <p>Required (MM-DD-YYYY)</p>
        <input
          type='text'
          value={updateForm.status}
          name='status'
          placeholder={task.status}
          onChange={handleChange}
        /> <p>Required ('To Do', 'Doing', 'Done')</p>
        <input type="Submit" value="Update Task" />
      </form>
    </div>
  )
}

export default Show

