import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Create = (props) => {
  // get status from the URL
  const { status } = useParams()
  const navigate = useNavigate()

  const sectionStatus = {
  'to do': 'To Do',
  'to%20do': 'To Do',
  doing: 'Doing',
  done: 'Done'
  }

  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    dateCreated: '',
    dateDue: '',
    status: sectionStatus[status] || ''
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
    navigate('/')
  }

  return (
    <div>
      <h2 className='EditTitle' >Create a New Task</h2>
      <form onSubmit={handleSubmit} className='Form' >
        <input className='input'
          type='text'
          value={newForm.title}
          name='title'
          placeholder='Task'
          onChange={handleChange}
        /> <p className='inputGap'>'Task' Required</p>
        <input className='Desc'
          type='text'
          value={newForm.description}
          name='description'
          placeholder='Description'
          onChange={handleChange}
        /> <p className='inputGap'>'Description' Optional</p>
        <input className='input'
          type='text'
          value={newForm.dateCreated}
          name='dateCreated'
          placeholder='Date Created'
          onChange={handleChange}
        /> <p className='inputGap'>'Date Created' Required</p>
        <input className='input'
          type='text'
          value={newForm.dateDue}
          name='dateDue'
          placeholder='Date Due'
          onChange={handleChange}
        /> <p className='inputGap'>'Date Due' Required</p>
        <select className='input'
          value={newForm.status}
          name='status'
          onChange={handleChange}
        >
          <option value='' disabled>Select status</option>
          <option value='To Do'>To Do</option>
          <option value='Doing'>Doing</option>
          <option value='Done'>Done</option>
        </select> <p className='inputGap'>'Status' Required</p>
        <input type ='Submit' value='Create Task' className='Btn' />
      </form> 
    </div>
  )
}

export default Create