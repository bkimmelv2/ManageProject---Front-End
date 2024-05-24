import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = (props) => {
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
    navigate(`/tasks/${params.id}`)
  }

  return (
    <div>
      <h2>Edit Task</h2>
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

export default Edit