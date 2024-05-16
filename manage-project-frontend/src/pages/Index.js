import {useState} from 'react';
import {Link} from 'react-router-dom';

const Index = (props) => {

  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    dateCreated: '',
    dateDue: '',
    status: ''
  })

  const handleChange = (event) => {
    setNewForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.createTasks(newForm)
  }

  const loaded = () => {
    return props.tasks.map((task) => {
      return (
        <div>
          <Link to={`/tasks/${task._id}`}>
            <h1>{task.title}</h1>
          </Link>
            <h2>{task.description}</h2>
            <h2>{task.dateCreated}</h2>
            <h2>{task.dateDue}</h2>
            <h2>{task.status}</h2>
        </div>
      )
    })
  }
  
  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <section>

      <h1>Tasks</h1>
      {props.tasks ? loaded() : loading()}
      <br/>

      <h2>Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={newForm.title}
            name='title'
            placeholder='Task'
            onChange={handleChange}
          /> <p>Required</p>
          <input
            type='text'
            value={newForm.description}
            name='description'
            placeholder='Description'
            onChange={handleChange}
          /> <p>Optional</p>
          <input
            type='text'
            value={newForm.dateCreated}
            name='dateCreated'
            placeholder='Date Created'
            onChange={handleChange}
          /> <p>Required (MM-DD-YYYY)</p>
          <input
            type='text'
            value={newForm.dateDue}
            name='dateDue'
            placeholder='Date Due'
            onChange={handleChange}
          /> <p>Required (MM-DD-YYYY)</p>
          <input
            type='text'
            value={newForm.status}
            name='status'
            placeholder='Status'
            onChange={handleChange}
          /> <p>Required ('To Do', 'Doing', 'Done')</p>
          <input type ='Submit' value='Create Task' />
        </form> <br/>

    </section>
  )
}

export default Index