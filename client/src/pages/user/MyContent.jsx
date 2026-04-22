import React , {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const MyContent = () => {
    const [data,setData]=useState([])
    const userId=localStorage.getItem('id')
    const handleFetch=async()=>{
        const res=await axios.get(`http://localhost:5001/api/content/getcontent${userId}`)
        console.log(res);
        setData(res.data)
        
    }
    useEffect(()=>{
        handleFetch
    })
  return (
    <>
    <div>
      <h1>
        My Content
      </h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Skill</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,i)=>{
          
            <tr>
            <td>{i+1}</td>
            <td>{item.skillId.skill}</td>
            <td><Link to={ `http://localhost:5001/api/${item.file}`}>View</Link></td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
    </>
  )
}

export default MyContent