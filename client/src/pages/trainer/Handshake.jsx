import axios from 'axios'
import React,{useState,useEffect} from 'react'
// import axios from 'axios'
const Handshake = () => {
    const [form , setForm] = useState({
        technology:''
    })
    const [data,setData] = useState([])
    const handleChange = (e)=>{
        setForm(()=>({...form,[e.target.name]:e.target.value}))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:5001/api/content/search',form);
        console.log(res);
        setData(res.data.msg)

    }
    const sendRequest=async(e)=>{
        const res=await axios.post(`http://localhost:5001/api/handshake/request/${e.userId._id}`,request)
        console.log(res);
        
    }
    // useEffect(()=>{
    //     handleFetch()
    // },[])
    const updateRequest=async(e)=>{
        const res=await axios.patch(`http://localhost:5001/api/handshake/accept/${e.id}`)
        console.log(res);
        handleFetch()
    }
    const rejectRequest=async(e)=>{
        const res=await axios.patch(`http://localhost:5001/api/handshake/reject/${e.id}`)
        console.log(res);
        handleFetch()
    }
    return (
        <>
            <div className="container-fluid">
                <div className="table table-container table-responsive mt-5">
                    <h2 className='text-start p-3 fw-bolder text-primary'>HANDSHAKE REQUEST</h2>
                    {/* jkdgg */}

                    <nav class=" bg-light">
                        <div class="container-fluid">

                         <div className="row">
                            <div className="col-sm-12">
                                   <form class="d-flex " onSubmit={handleSubmit} role="search">
                                <input class="form-control me-2 " type="search" name='technology' placeholder="Search Technology Ex-HTMl" aria-label="Search" onChange={handleChange}/>
                                <button class="btn btn-outline-success w-25" type="submit">Search</button>
                            </form>
                            </div>
                         </div>
                        </div>
                    </nav>
                    {/* jkdsdfg */}
                    <table className="table table-bordered table-striped text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>S.NO</th>
                                <th>Skills</th>
                                <th>Trainer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        {data.map((item,i)=>(
                                <tr >
                                    <td>{i+1}</td>
                                <td>{item.skillId.skill}</td>
                                <td>{item.userId.name}</td>
                                <td>
                                    <button onClick={()=>{updateRequest}}>Accept Request</button>
                                    <button onClick={()=>{rejectRequest}}>Reject Request</button>
                                </td>
                                
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Handshake