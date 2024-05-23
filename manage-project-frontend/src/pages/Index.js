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

  // function to group tasks by their status
  const loaded = () => {
    // group tasks using reduce
    const groupedTasks = props.tasks.reduce((groups, task) => {
      // if the group for the current task's status doesn't exist, create it
      if (!groups[task.status]) {
        groups[task.status] = []
      }
      // add the current task to its group
      groups[task.status].push(task)
      return groups
    }, {})

    return (
      // render tasks and group them by status
      <div>
        {['To Do', 'Doing', 'Done'].map(status => (
          // create a section for each status
          <div key={status}>
            <h2>{status}:</h2>
              {groupedTasks[status] && groupedTasks[status].length > 0 ? (
                groupedTasks[status].map(task => (
                  // create a div for each task
                  <div key={task._id}>
                    <Link to={`/tasks/${task._id}`}>
                      <h1>{task.title}</h1>
                    </Link>
                      {/* <h2>{task.description}</h2>
                      <h2>{task.dateCreated}</h2>
                      <h2>{task.dateDue}</h2> */}
                  </div>
                ))
              ) : (<p>No current tasks</p>)
              } <br/>
          </div>
        ))}
      </div>
    )
  }

  // ORIGINAL CODE //
  // const loaded = () => {
  //   return props.tasks.map((task) => {
  //     return (
  //       <div>
  //         <Link to={`/tasks/${task._id}`}>
  //           <h1>{task.title}</h1>
  //         </Link>
  //           <h2>{task.description}</h2>
  //           <h2>{task.dateCreated}</h2>
  //           <h2>{task.dateDue}</h2>
  //           <h2>{task.status}</h2>
  //       </div>
  //     )
  //   })
  // }
  
  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <section>

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
          /> <p>'Task' Required</p>
          <input
            type='text'
            value={newForm.description}
            name='description'
            placeholder='Description'
            onChange={handleChange}
          /> <p>'Description' Optional</p>
          <input
            type='text'
            value={newForm.dateCreated}
            name='dateCreated'
            placeholder='Date Created'
            onChange={handleChange}
          /> <p>'Date Created' Required</p>
          <input
            type='text'
            value={newForm.dateDue}
            name='dateDue'
            placeholder='Date Due'
            onChange={handleChange}
          /> <p>'Date Due' Required</p>
          <select
            value={newForm.status}
            name='status'
            onChange={handleChange}
          >
            <option value='' disabled>Select status</option>
            <option value='To Do'>To Do</option>
            <option value='Doing'>Doing</option>
            <option value='Done'>Done</option>
          </select> <p>'Status' Required</p>
          <input type ='Submit' value='Create Task' />
        </form> <br/>

    </section>
  )
}

export default Index