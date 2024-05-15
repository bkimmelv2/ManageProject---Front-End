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

  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <h2>{task.description}</h2>
      <h2>{task.dateCreated}</h2>
      <h2>{task.dateDue}</h2>
      <h2>{task.status}</h2>
    </div>
  )
}

export default Show

