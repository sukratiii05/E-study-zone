import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Content = () => {
  const userId = localStorage.getItem('id')
  const [data, setData] = useState([])
  const [form, setForm] = useState({
    skillId: "",
    content: "",
    userId: userId
  });

  const handleFetch = async () => {
    const res = await axios.get(`http://localhost:5001/api/skill/getskill/${userId}`)
    console.log(res.data);
    setData(res.data.data)

  }
  useEffect(() => {
    handleFetch()
  }, [])
  const handleChange = (e) => {
    // console.log(e);
    if (e.target.type == "file") {
      setForm(() => ({ ...form, [e.target.name]: e.target.files[0] }))
    }
    else {
      setForm(() => ({ ...form, [e.target.name]: e.target.value }))
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5001/api/content/upload", form, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
    console.log(res);
    window.alert("File uploaded successfully.")
  }

  console.log(form);

  return (

    <>

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header text-center bg-dark text-white">
                Upload Content
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Text input */}
                  <div className="mb-3">
                    <label htmlFor="skill" className="form-label">Enter Your Skill Here</label>
                    <select name="skillId" onChange={handleChange} className='form-control' id="">
                      <option value="">--Select Skill</option>
                      {data.map((item, i) => (
                        <option value={item._id} key={i + 1}>{item.skill}</option>
                      ))}
                    </select>
                  </div>

                  {/* File input */}
                  <div className="mb-3">
                    <label htmlFor="profilePic" className="form-label">Select Content</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePic"
                      name='content'
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Upload Content
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Content