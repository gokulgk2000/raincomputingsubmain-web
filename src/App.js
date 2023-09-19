import './App.css';
import { useState } from 'react';
import { userRegister } from './helpers/backend_helpers';
import toastr from 'toastr';
import "toastr/build/toastr.min.css"

const App = () => {
  const[firstname,setFirstname] = useState()
  const[lastname,setLastname] = useState()
  const[email,setEmail] = useState()
  const [password,setPassword] = useState() 

  const handleSubmit = async() => {
    const payload = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    const res = await userRegister(payload)
    if(res.success){
      toastr.success(`user register  successfully`, "Success")
      console.log("res",res)
    }
  }
  return (
    <>
    <div className="registration-form">
    <h2>Registration Form</h2>
  
      <div className="form-group">
        <label htmlFor="username">Firstname:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Lastname:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" onClick={handleSubmit}>Register</button>
      </div>

  </div>
  </>
  );
}

export default App;
