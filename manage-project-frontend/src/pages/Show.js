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
    <div className='Show'>
      <h1 className='ShowTitle'>{task.title}</h1>
      <h2 className='ShowDescription'>Description: {task.description}</h2>
      <h2 className='DatesStatus'>Date created: {task.dateCreated}</h2>
      <h2 className='DatesStatus'>Date due: {task.dateDue}</h2>
      <h2 className='DatesStatus'>Status: {task.status}</h2>
      <br/>

      <Link to={`/tasks/${task._id}/edit`}>
        <button className='Edit'>Edit</button>
      </Link>
      <br/> <br/>

      <button className='Delete' onClick={handleDelete}>
        Delete
      </button> 

    </div>
  )
}

export default Show