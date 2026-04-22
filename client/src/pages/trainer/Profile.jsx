import React from 'react';
import './Profile.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Profile() {
  const userId = localStorage.getItem('id')
  const [data, setData] = useState([]);
  const handleFetch = async () => {
    const res = await axios.get(`http://localhost:5001/api/user/getuser/${userId}`)
    console.log(res);
    setData(res.data.data)

  }
  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
          alt="Sukrati"
          className="profile-image"
        />
        <h1 className="profile-name">{data.name}</h1>
        {/* <p className="profile-bio">
          Full-stack developer passionate about creating beautiful, user-friendly web applications.
        </p> */}
      </div>

      <div className="divider"></div>

      <div className="profile-details">
        <p>Email:{data.email}</p>
        <p>Role: {data.role}</p>
        <p>Qualification:{data.qualifications}</p>
      </div>
      <input className="btn" type="submit" name="" id="" />
    </div>

  );
}

export default Profile;