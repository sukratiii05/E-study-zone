import React, { useState } from 'react'
import axios from 'axios'
const Register = () => {
  const [data,setData]=useState({
    
    name:'',
    email:'',
    password:'',
    qualifications:'',
    role:'',
    

  })
  const change = (e) => {
    setData(() => ({ ...data, [e.target.name]: e.target.value }))
  }
  const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=axios.post('http://localhost:5001/api/user/register',data)
            window.alert("hii");
        }
        catch(er){
            console.log(er);
            alert("Sorry try again.")
        }
    }
    console.log(data);
    
  return (
    <>
    <div className="container-fluid">
      <div className="row text-center mt-5">
        <div className="col-sm-12">
          <h1>Registration Form</h1>
          <form onSubmit={handleSubmit}>
            
            <label htmlFor="">Enter your name: </label>
            <input type="text" name='name' onChange={change}/> <br />
            
            <label htmlFor="">Enter your email:</label>
            <input type="text" name='email' onChange={change}/><br />
            Enter Password:
            <input type="password" name="password" onChange={change} id="" />
            <label htmlFor="">Enter your qualifications:</label>
            <input type="text" name="qualifications" onChange={change} /><br />
            <label htmlFor="">Enter your role: </label>
            <select name="role" onChange={change}>
              <option value="">--Select One--</option>
              <option value="Trainer">Trainer</option>  
              <option value="Learner">Learner</option>  
            </select> <br />
            {/* <label htmlFor="">Enter your location:</label>
            <select name="city" id="">Choose your city
              <option value="">Choose your city</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Banglore">Banglore</option>
              <option value="Lucknow">Lucknow</option>
            </select> */}
            <input type="submit" name="" id="" />
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register