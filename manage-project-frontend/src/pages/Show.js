import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'

const Show = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const task = props.tasks?.find((p) => p._id === params.id)

  if (!task) {
    return <div>Loading...</div>
  }

  const handleDelete = () => {
    props.deleteTasks(params.id)
    navigate('/')
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <h2>Description: {task.description}</h2>
      <h2>Date created: {task.dateCreated}</h2>
      <h2>Date due: {task.dateDue}</h2>
      <h2>Status: {task.status}</h2>
      <br/>

      <Link to={`/tasks/${task._id}/edit`}>
        <button>Edit</button>
      </Link>
      <br/> <br/>

      <button onClick={handleDelete}>
        Delete
      </button> 

    </div>
  )
}

export default Show