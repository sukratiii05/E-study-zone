import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AddSkills = () => {
    const userId = localStorage.getItem('id')
    const [totalData, setTotalData] = useState([])
    const [data, setData] = useState({
        skill: '',
        description: '',
        userId: userId
    })
    const handleChange = async (e) => {
        setData(() => ({ ...data, [e.target.name]: e.target.value }))

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post('https://e-study-zone-1ln1.onrender.com/api/skill/addskill', data)
        console.log(res);
        alert("Skill addedd successfully")

    }
    const handleFetch = async () => {
        const res = await axios.get(`https://e-study-zone-1ln1.onrender.com/api/skill/skills/${userId}`)
        console.log(res);

        setTotalData(res.data)

    }


    useEffect(() => {
        handleFetch()
    }, [])
    const handleEdit = async () => {

    }
    const deleteSkill = async (id) => {
        try {
            await axios.delete(`https://e-study-zone-1ln1.onrender.com/api/skills/${id}`);
            fetchSkills();

        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <div className="card text-center">

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Enter your Skills</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name='skill' onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Enter your description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='description' onChange={handleChange}>
                            </textarea>
                        </div>
                        <button href="#" className="btn btn-primary" type='submit'>Add Skill</button>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Quote
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Skill</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalData.map((item, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.skill}</td>
                                        <td>{item.description}</td>
                                        <td><button >Edit</button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </blockquote>
                </div>
            </div>
        </>

    )
}

export default AddSkills