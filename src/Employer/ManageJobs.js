import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployer } from '../Functions/GetData';
import NavBar from '../NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../Banner';
import SideBar from './SideBar';
import ContentContainer from '../ContentContainer';
import { timeDifference } from '../Functions/GetTimeDifference';
import { router } from '../Router/Router';

function ManageJobs() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentEmployer, setcurrentEmployer] = useState("")

    const { isFetching, UserDetails, fetchErr } = useSelector((state) => state.CurrentUserSlice)
    console.log(UserDetails);


    useEffect(() => {
        getEmployer(dispatch)
    }, [])

    // useEffect(() => {
    //     console.log("UserDetails updated:", UserDetails);
    //     if (UserDetails) {
    //         setcurrentEmployer(UserDetails)
    //     }
    // }, [UserDetails]); // Adding UserDetails as a dependency here





    const [myJobs, setmyJobs] = useState([])

    // //fetching all the posted jobs from the database
    useEffect(() => {
        console.log("UserDetails updated:", UserDetails);
        if (UserDetails) {
            setcurrentEmployer(UserDetails)
        }
        console.log(currentEmployer);
        if(currentEmployer){
            const uri = `${router}/users/employerJobs/${currentEmployer.email}`
        axios.get(uri).then((res) => {
            console.log(res);
            setmyJobs(res.data)
            // console.log(myJobs);
        }).catch((err) => {
            console.log(err)
        })
        }
        
    }, [UserDetails])

    const edit = (id) => {
        console.log(id);
        localStorage.setItem("EditJobID", JSON.stringify(id))
        navigate("/manage_jobs/edit_job")
    }



    return (
        <>
            <NavBar
                PostJobBtn={
                    <Link to={"/postJob"}>
                        <button className="post-a-job-btn py-2 px-3 rounded-pill">Post a Job</button>
                    </Link>}
            />
            <Banner />
            <SideBar
                manageJobsStyle='dashboard text-dark d-flex align-items-center w-100 px-4 py-2 rounded'
                PostJobStyle='side-menu-btn d-flex align-items-center w-100 px-4 py-2 rounded'
                dashboardStyle="side-menu-btn d-flex align-items-center w-100 px-4 py-2 rounded"
            />
            <ContentContainer
                pageName="Manage Jobs"
                Arrow="‣"
                pageDirectory="Manage Jobs"
                employerDashboard={
                    <div className='w-100'>
                        <div>
                            {
                                myJobs
                                    .slice() // Create a shallow copy of the array before sorting
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp in descending order
                                    .map((jobs, index) => (
                                        <div className='px-3 jobs-div w-75 job-display-div' key={index}>
                                            <div className='bg-white shadow px-4 py-4 rounded mb-1 w-100' >
                                                <div className='d-flex mb-2 justify-content-between'>
                                                    <div className='d-flex bg-white px-2 me-3 rounded'>
                                                        <div className='me-1'>
                                                            <i className="bi bi-bag-check"></i>
                                                        </div>
                                                        <div className='jobTitle-text'>
                                                            <h5>{jobs.jobTitle}</h5>

                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <div className='d-flex align-items-center justify-content-center job-type text-primary px-2 rounded'>
                                                            <div className='me-1'>
                                                                <i className="bi bi-briefcase"></i>
                                                            </div>
                                                            <div className='jobType-text'>{jobs.jobType}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mb-2'>
                                                    <div>
                                                        <div className='d-flex bg-white px-2 me-3 rounded-sm'>
                                                            <div className='me-1'>
                                                                <i class="bi bi-clock"></i>
                                                            </div>
                                                            <p className='me-1'>Posted:</p>
                                                            <div>{timeDifference(jobs.timestamp)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex mb-2 justify-content-between'>
                                                    <div className='d-flex justify-content-evenly'>
                                                        <div className='me-3'>
                                                            <button onClick={()=>edit(jobs._id)} className="btn btn-primary">EDIT</button>
                                                        </div>
                                                        <div className='me-3'>
                                                            <button className="btn btn-dark">DELETE</button>
                                                        </div>
                                                        <div>
                                                            <button className="btn btn-primary">CLOSE JOB</button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6 className='btn border-primary'>Response(0)</h6>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    ))
                            }
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default ManageJobs