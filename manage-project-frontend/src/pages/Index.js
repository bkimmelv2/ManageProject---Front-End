import {Link} from 'react-router-dom'

const Index = (props) => {

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
                  </div>
                ))
              ) : (<p>No current tasks</p>)
              } <br/>
              <Link to={`/create/${status.toLowerCase()}`}>
                <button>Create New Task</button>
              </Link>
            <br/> <br/>
          </div>
        ))}
      </div>
    )
  }
  
  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <section>
      {props.tasks ? loaded() : loading()}
    </section>
  )
}

export default Index