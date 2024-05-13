import {useState} from 'react';
import {Link} from 'react-router-dom';

const Index = (props) => {

  const loaded = () => {
    return props.tasks.map((task) => {
      return (
        <div>
          <Link to={`tasks/{task._id}`}>
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

  return props.tasks? loaded() : loading()
}

export default Index