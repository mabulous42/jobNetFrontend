import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar'
import SideBar from './SideBar'
import ContentContainer from '../ContentContainer'
import SelectSkill from '../JobSeeker/SelectSkill'
import programmingSkills from '../SkillsApi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Banner from '../Banner'
import { router } from '../Router/Router'

function PostJob() {
    const skillsList = programmingSkills
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [isSelected, setisSelected] = useState(true)

    let userToken = JSON.parse(localStorage.getItem("token"))
    const navigate = useNavigate()

    const [currentEmployer, setcurrentEmployer] = useState("")

    const [selectedJobType, setselectedJobType] = useState("")
    const [selectedSalaryType, setselectedSalaryType] = useState("")

    useEffect(() => {
        const uri = "http://localhost:5353/users/employerDashboard"
        axios.get(uri, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then((res) => {
            console.log(res);
            setcurrentEmployer(res.data)
        }).catch((err) => {
            console.log(err)
            alert("Session Timeout")
            navigate("/employerLogin")
        })
    }, [])

    const handleSkillClick = (e, skill) => {
        e.preventDefault()
        setSelectedSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.includes(skill)) {
                if (selectedSkills.length - 1 === 0) {
                    setisSelected(true)
                }
                else {
                    setisSelected(false)
                }

                // If the skill is already selected, remove it from the list
                return prevSelectedSkills.filter((selectedSkill) => selectedSkill !== skill);
            } else {
                console.log("Selected: " + Number(selectedSkills.length + 1));
                if (selectedSkills.length + 1 >= 1) {
                    setisSelected(false)
                }
                else {
                    setisSelected(true)
                }
                // If the skill is not selected, add it to the list
                return [...prevSelectedSkills, skill];
            }
        });
    };

    const onSubmit = (values, errors) => {
        let postedJobDetails = {
            jobTitle: values.jobTitle,
            jobDescription: values.jobDescription,
            salaryType: values.selectedSalaryType,
            min_salary: values.min_salary,
            max_salary: values.max_salary,
            jobType: values.selectedJobType,
            requiredSkills: selectedSkills,
            email: currentEmployer.email,
            author: currentEmployer.employerName
        }

        console.log(postedJobDetails);
        const uri = `${router}/users/jobs`
        axios.post(uri, postedJobDetails).then((res) => {
            console.log(res);
            alert(res.data.message)
            navigate("/employerDashboard")
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.message)
        })
    }

    const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
        initialValues: {
            jobTitle: "",
            jobDescription: "",
            min_salary: "",
            max_salary: "",
            selectedJobType: "",
            selectedSalaryType: ""
        },
        validationSchema: yup.object().shape({
            jobTitle: yup.string()
                .min(2, "Job title is too short")
                .max(50, "Job title is too long")
                .required("This field cannot be empty"),
            jobDescription: yup.string()
                .min(2, "Job description is too short")
                .required("This field cannot be empty"),
            min_salary: yup.number()
                .required("This field cannot be empty"),
            max_salary: yup.number()
                .required("This field cannot be empty"),
            selectedJobType: yup.string()
                .required('Please select a job type'),
            selectedSalaryType: yup.string()
                .required('Please select a salary type')
        }),
        onSubmit
    })

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
                dashboardStyle='side-menu-btn d-flex align-items-center w-100 px-4 py-2 rounded'
                manageJobsStyle='side-menu-btn d-flex align-items-center w-100 px-4 py-2 rounded'
                PostJobStyle='dashboard text-dark d-flex align-items-center w-100 px-4 py-2 rounded'
            />
            <ContentContainer
                pageName="Post a Job"
                Arrow="‣"
                pageDirectory="Post a Job"
                postJob=
                {
                    <div>
                        <form action="" onSubmit={handleSubmit} className='pt-5'>
                            <div className='shadow bg-white p-5 rounded-4 mb-5'>
                                <h4 className='job-text mb-3'>Job Details</h4>
                                <div className='mt-4'>
                                    <h6>Job Title*</h6>
                                    <input onBlur={handleBlur} value={values.jobTitle} onChange={handleChange} className='w-100 job-input rounded px-3' placeholder='Ex: Product Designer' type="text" name="jobTitle" id="" />
                                    {touched.jobTitle && errors.jobTitle &&
                                        <small className='text-danger fw-bold'>{errors.jobTitle}</small>
                                    }
                                </div>
                                <div className='mt-4'>
                                    <h6>Job Description*</h6>
                                    <textarea onBlur={handleBlur} value={values.jobDescription} onChange={handleChange} className='w-100 job-input rounded px-3' placeholder='Write about the job in details...' name="jobDescription" id="" cols="30" rows="6"></textarea>
                                    {touched.jobDescription && errors.jobDescription &&
                                        <small className='text-danger fw-bold'>{errors.jobDescription}</small>
                                    }
                                </div>
                                <div className='mt-4 select-container'>
                                    <h6>Job Type</h6>
                                    <select onChange={handleChange} onBlur={handleBlur} value={values.selectedJobType} name="selectedJobType" id="" className='w-50 job-input rounded'>
                                        <option className='form-control' value="" selected disabled>Select</option>
                                        <option className='form-control' value="Full Time">Full Time</option>
                                        <option className='form-control' value="Part Time">Part Time</option>
                                        <option className='form-control' value="Freelance">Freelance</option>
                                    </select>
                                    {touched.selectedJobType && errors.selectedJobType ? (
                                        <small className="text-danger fw-bold">{errors.selectedJobType}</small>
                                    ) : null}
                                </div>
                                <div className='mt-4'>
                                    <h6>Salary</h6>
                                    <div className='d-flex'>
                                        <div className='w-50'>
                                            <select onChange={handleChange} onBlur={handleBlur} value={values.selectedSalaryType} name="selectedSalaryType" id="" className='salary job-input rounded w-100'>
                                                <option className='form-control' value="" selected disabled>Select</option>
                                                <option className='form-control' value="Monthly">Monthly</option>
                                                <option className='form-control' value="Weekly">Weekly</option>
                                            </select>
                                            {touched.selectedSalaryType && errors.selectedSalaryType ? (
                                                <small className="text-danger fw-bold">{errors.selectedSalaryType}</small>
                                            ) : null}
                                        </div>
                                        <div className='w-25 mx-4'>
                                            <input onBlur={handleBlur} value={values.min_salary} onChange={handleChange} className='w-100 job-input rounded' placeholder='Min' type="text" name="min_salary" id="" />
                                            {touched.min_salary && errors.min_salary &&
                                                <small className='text-danger fw-bold'>{errors.min_salary}</small>
                                            }
                                        </div>
                                        <div className='w-25'>
                                            <input onBlur={handleBlur} value={values.max_salary} onChange={handleChange} className='w-100 job-input rounded' placeholder='Max' type="text" name="max_salary" id="" />
                                            {touched.max_salary && errors.max_salary &&
                                                <small className='text-danger fw-bold'>{errors.max_salary}</small>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <h4 className='job-text mb-3 fs-5'>Skills & Experience</h4>
                                    <h6>Skills*</h6>
                                    <input className='w-100 job-input rounded px-3'
                                        placeholder='Add skills'
                                        type="text" name="" id=""
                                        value={selectedSkills.join(', ')}
                                    />
                                    <div>
                                        {skillsList.map((skill, index) => (
                                            <button
                                                key={index}
                                                className={`skill-button ${selectedSkills.includes(skill.name) ? 'selected' : ''}`}
                                                onClick={(event) => handleSkillClick(event, skill.name)}
                                            >
                                                {skill.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='me-3'>
                                    <button disabled={isSelected} type='submit' className="btn btn-dark rounded-pill px-5 py-2">Post Job</button>
                                </div>
                                <div>
                                    <Link to={"/employerDashboard"}>
                                        <button className="py-2 cancel-btn">Cancel</button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </>
    )
}

export default PostJob