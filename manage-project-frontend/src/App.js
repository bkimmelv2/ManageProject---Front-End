import Header from './components/Header'
import Main from './components/Main'

import './App.css'

import React, { useState } from 'react'

import axios from 'axios'
//Axios is usually used to perform HTTP requests on an API. This means that you can send a POST request if you want to store user input from the application into the server/To send an HTTP request from the front-end to the back-end.

function App() {
  const [toggleLogin, setToggleLogin] = useState(true)    //This is true since Login page is rendered.
  const [toggleError, setToggleError] = useState(false)    //No error as the blank login page is without error. Hence, useState initial value is false.
  const [errorMessage, setErrorMessage] = useState('')    //No error and therefore no error message. initial value of useSte shows empty string.
  const [toggleLogout, setToggleLogout] = useState(false)  //Log-in rendering is not log-out. Therefore, initial value of log-out is false.
  const [currentUser, setCurrentUser] = useState({})       //Upon display of the user page, since username is not set, initial value of useState is empty.

  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [userPhoto, setUserPhoto] = useState('')  


  // =================
  //HANDLER FUNCTIONS
  //==================

  const handleCreateUser = (event) => {
    event.preventDefault()          //This prevents the default behaviour of the form which reloads the page.
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password,
      userPhoto: userPhoto
    }
    setUsername('')     //FOR CREATE ACCOUNT PAGE, initial value of user is empty
    setPassword('')     //FOR CREATE ACCOUNT PAGE, initial value of password is empty.
    setUserPhoto('')    //FOR CREATE ACCOUNT PAGE, initial value of userphoto is empty.

    axios.post('http://localhost:4000/createaccount', userObj).then((response) => {       //Create new username & password and request back-end to store created username & password
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }

  const handleLogin = (event) => {     
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    setUsername('')       //FOR LOG-IN PAGE: Initial value of user name is empty.
    setPassword('')       //FOR LOG-IN PAGE: Initial value of password is empty.

    axios.put('http://localhost:4000/login', userObj).then((response) => {        //Request backend for data to log-in. 
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        console.log(response);
        setToggleError(true)
        setErrorMessage(response.data)
      }
    })
  }

  const handleLogout = () => {
    setCurrentUser({})       //Set current user back to empty when logged out.
    handleToggleLogout()
  }

  const handleToggleForm = () => {      //this switches the page from log-in to create account.
    setToggleError(false)
    if(toggleLogin === true) {       //If Log-in page is already displayed,
      setToggleLogin(false)            //no need to set the page to show log-in page.
    } else {
      setToggleLogin(true)          //If Log-in page is not displayed, set the toggle log-in function so that we can see the log-in page.
    }
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)        //If user already logged out, no need to invoke the setToggleLogout function.
    } else {
      setToggleLogout(true)         //If user is still logged-in, we have the setToggleLogout function for logging out.
    }
  }

  //===================
  // USER SHOW PAGE
  //===================


  return (
    <div className="App">
      <div>
        {toggleLogout ?
          <button onClick={handleLogout} class='logoutBtn'>Logout</button> 
          :      //If toggleLogout, continue using handleToggleLogout, If not handleLogin & handleCreate User will be applicable as shown in the div below:
          <div class='appFormDiv'>
            {toggleLogin ?
              //login form
              <div className="formContainer">
                <h1 class='formTitle'>Login</h1>
                <form onSubmit={handleLogin} className='inputForm'>
                  <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                  <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                  {toggleError ?
                    <h5 class='errorMsg'>{errorMessage}</h5>
                    :
                    null
                  }
                  <input type='submit' value='Login' class='submitBtn'/>
                </form>
              </div>
            :
            // new user form
            <div className="App" class='formContainer'>
              <h1 class='formTitle'>Create an Account</h1>
              <form onSubmit={handleCreateUser} class='inputForm'>
                <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                <input type='text' placeholder='userphoto' class='textInput' onChange={(event)=> {setUserPhoto(event.target.value)}}/>

                {toggleError ?
                  <h5 class='errorMsg'>{errorMessage}</h5>
                  :
                  null
                }
                <input type='submit' value='Register' class='submitBtn'/>
              </form>
            </div>
            }
            <button onClick={handleToggleForm} class='accountBtn'>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
          </div>
        }
        

      </div>
      
      {currentUser.username ?
        <div class='loggedInDiv'>
          <Header handleLogout={handleLogout}/>
          <Main username={username}/>          
        </div>
        :
        null
      }    
    
    </div>
  );
}

export default App;

