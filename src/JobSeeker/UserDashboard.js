import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserSidebar from './UserSidebar'
import Banner from '../Banner'
import ContentContainer from '../ContentContainer'
import NavBar from '../NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../Functions/GetData'
import { timeDifference } from '../Functions/GetTimeDifference'
import { router } from '../Router/Router'

function UserDashboard() {
    const userToken = JSON.parse(localStorage.getItem("token"))
    const navigate = useNavigate()

    const [currentUser, setcurrentUser] = useState("")
    const [allJobs, setallJobs] = useState([])
    const [userSkills, setuserSkills] = useState([])

    const dispatch = useDispatch();
    const { isFetching, UserDetails, fetchErr } = useSelector((state) => state.CurrentUserSlice);
    console.log(UserDetails);

    // useEffect(() => {
    //     if (UserDetails) {
    //         setcurrentUser(UserDetails)
    //     }
    // }, [UserDetails]); // Adding UserDetails as a dependency here

    // console.log(currentUser.skills);

    useEffect(() => {
        getUser(dispatch);
    }, []);

    



    //fetching all the posted jobs from the database
    useEffect(() => {
        if (UserDetails) {
            setcurrentUser(UserDetails)
        }
        const uri = `${router}/users/allJobs`
        axios.get(uri).then((res) => {
            console.log(res);
            let postJobs = res.data
            console.log(postJobs);
            console.log(currentUser.skills);
            // filtering the job based on the current user skills, 
            // only job that includes the current user skill should display
            const filteredJobs = postJobs.filter(job =>
                currentUser.skills.some(skill => job.requiredSkills.includes(skill))
            );
            setallJobs(filteredJobs)
            console.log(filteredJobs);

        }).catch((err) => {
            console.log(err)
        })
    }, [UserDetails])

    const getJobID = (id) => {
        console.log(id);
        console.log(currentUser);
        localStorage.setItem("JobID", JSON.stringify(id))
        localStorage.setItem("CU", JSON.stringify(currentUser));
    }




    return (
        <>
            <NavBar
                userName="Abbas"
            />
            <Banner />
            <UserSidebar
                dashboardStyle='dashboard text-dark d-flex align-items-center w-100 px-4 py-2 rounded'
                PostJobStyle='side-menu-btn d-flex align-items-center w-100 px-4 py-2 rounded'
            />
            <ContentContainer
                pageName="Dashboard"
                userDashboard={
                    <div className='w-100'>
                        <div>
                            {
                                allJobs
                                    .slice() // Create a shallow copy of the array before sorting
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp in descending order
                                    .map((jobs, index) => (
                                        <div className='px-3 jobs-div w-75 job-display-div' key={index}>
                                            <div className='bg-white shadow px-4 py-4 rounded mb-1 w-100'>
                                                <div className='d-flex mb-2'>
                                                    <h5 className='me-3 job-desc-text'>{jobs.author}</h5>
                                                    <div className=''>
                                                        <div className='d-flex align-items-center justify-content-center job-type text-primary px-2 rounded'>
                                                            <div className='me-1'>
                                                                <i className="bi bi-briefcase"></i>
                                                            </div>
                                                            <div className='jobType-text'>{jobs.jobType}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex mb-2'>
                                                    <div>
                                                        <div className='d-flex shadow bg-white px-2 me-3 rounded'>
                                                            <div className='me-1'>
                                                                <i className="bi bi-bag-check"></i>
                                                            </div>
                                                            <div className='jobTitle-text'>{jobs.jobTitle}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='d-flex shadow bg-white px-2 me-3 rounded-sm'>
                                                            <div className='me-1'>
                                                                <i className="bi bi-calendar2"></i>
                                                            </div>
                                                            <div>{timeDifference(jobs.timestamp)}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='d-flex shadow bg-white px-2 me-3 rounded'>
                                                            <div className='me-1'>
                                                                <i className="bi bi-wallet"></i>
                                                            </div>
                                                            <div> ₦{jobs.min_salary} - ₦{jobs.max_salary} ({jobs.salaryType})</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-3'>
                                                    <h6 className='me-1'>Required Skills: </h6>
                                                    <div className='d-flex flex-wrap'>
                                                        {
                                                            jobs.requiredSkills.map((skill, i) => (
                                                                <div className='me-1 mb-1 skill-div rounded px-2' key={i}>
                                                                    <div className='d-flex skill-text'>{skill}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <Link to={"/applyJob"}>
                                                        <div className='mt-3 text-end'>
                                                            <button className="btn btn-dark" onClick={() => getJobID(jobs._id)}>VIEW JOB DETAILS</button>
                                                        </div>
                                                    </Link>
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

export default UserDashboard