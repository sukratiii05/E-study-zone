import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const TrainerChangePassword = () => {
  const userId = localStorage.getItem('id')
 const[data,setData]= useState({
  op:"",
  np:"",
  cnp:""
 })
 const handlechange=(e)=>{
  setData(()=>(({...data,[e.target.name]:e.target.value})))
 }
 const handlesubmit=async(e)=>{
  e.preventDefault()
  if(data.np!==data.cnp){
    console.log("password do not match")
  }
  try{
    const res =await axios.patch(`http://localhost:5001/api/user/changepassword/${userId}`,data)
    console.log(res.data)
  }
  catch(error){
    console.log(error)
    console.log({msg:"try again later"})
  }
 }

  return (
    <>
     <div className="container-fluid d-flex align-items-center justify-content-center vh-100"
         style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>

      <div className="card shadow-lg p-4" style={{ width: '350px', borderRadius: '15px' }}>
        
       

        <p className="text-center text-muted mb-4">
         Change password
        </p>

        <form onSubmit={handlesubmit} >
          
          <div className="mb-3">
            <label className="form-label">Enter current password</label>
            <input
              type="password"
              name="op"
              className="form-control"
              placeholder="current password"
              onChange={handlechange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label"> New Password</label>
            <input
              type="password"
              name="np"
              className="form-control"
              placeholder="New password"
             onChange={handlechange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Confirm Password</label>
            <input
              type="password"
              name="cnp"
              className="form-control"
              placeholder="Confirm password"
             onChange={handlechange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{
              background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            CONTINUE
          </button>

          <div className="text-center mt-3">
            <Link to="/register" style={{ textDecoration: 'none' }}>
              forget password ?
            </Link>
          </div>

        </form>
      </div>
    </div>
    </>
  )
}

export default TrainerChangePassword