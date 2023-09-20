import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import Banner from '../Banner'
import UserSidebar from './UserSidebar'
import ContentContainer from '../ContentContainer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from "yup"
import { router } from '../Router/Router'

function ApplyForJob() {
  const jobID = JSON.parse(localStorage.getItem("JobID"))
  const currentUser = JSON.parse(localStorage.getItem("CU"))
  const navigate = useNavigate()

  const [currentJob, setcurrentJob] = useState("")
  //fetching all the posted jobs from the database
  useEffect(() => {
    const uri = "http://localhost:5353/users/allJobs"
    axios.get(uri).then((res) => {
      console.log(res);
      let postJobs = res.data
      console.log(postJobs);
      let found = postJobs.find((job) => job._id === jobID)
      console.log(found);
      setcurrentJob(found)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const [file, setfile] = useState("")
  const [response, setresponse] = useState("")
  const [isUpload, setisUpload] = useState(false)
  const [submitApplication, setsubmitApplication] = useState(true)

  const uploadCV = (e) => {
    const file = e.target.files[0]
    console.log(file);
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      setisUpload(true)
      setfile(result)
    }
  }

  const uploadFileURL = () => {
    console.log(file);
    const uri = "http://localhost:5353/users/uploadCV"
    const data = { cv: file }
    axios.post(uri, data).then((res) => {
      console.log(res);
      setresponse(res.data)
      console.log(response);
      setsubmitApplication(false)
    }).catch((error) => {
      console.log(error);
    })
  }

  const onSubmit = (values, errors) => {
    const cv_url = response.url;
    const userEmail = currentUser.email
    const { firstName, lastName } = values;
    const data = { firstName, lastName, userEmail, cv_url, jobID }
    console.log(data);
    const uri = `${router}/users/submitApplication`
    axios.post(uri, data).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
      alert(err.response.data.message)
    })
  }

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
    initialValues: {
      firstName: "",
      lastName: ""
    },
    validationSchema: yup.object().shape({
      firstName: yup.string()
        .min(2, "first name is too short")
        .max(50, "first name is too long")
        .required("first name cannot be empty")
        .matches(/^[a-zA-Z0-9]+$/, "first Name should not contain special characters"),
      lastName: yup.string()
        .min(2, "last name is too short")
        .max(50, "last name is too long")
        .required("last name cannot be empty")
        .matches(/^[a-zA-Z0-9]+$/, "last Name should not contain special characters")
    }),
    onSubmit
  })




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
        pageName="Job Details"
        Arrow="‣"
        pageDirectory="Job details"

        postJob={
          <div className='mx-auto w-75'>
            <div className='text-center'>
              <h1>{currentJob.jobTitle}</h1>
              <p>{currentJob.jobDescription}</p>
            </div>
            <div>
              <h5>About Company: </h5>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam ipsum vero quo, odio neque, sapiente praesentium ut commodi porro atque earum dignissimos provident sunt nam quaerat libero magnam eius placeat.
                Officiis itaque molestiae vel sit nisi placeat, provident voluptatem? Esse obcaecati voluptatem natus id delectus impedit sapiente fuga nostrum velit consequuntur quia at rem, quidem ratione accusamus iusto. Explicabo, minus.
                Nostrum dicta voluptatibus deserunt, consequatur saepe, aperiam amet quas culpa incidunt sequi neque nam fuga. Mollitia nemo vero voluptates itaque, magnam perspiciatis modi unde eligendi. Consequuntur quibusdam ducimus architecto mollitia.
                Aliquam dolorum reprehenderit veniam sunt perspiciatis? Cumque nesciunt molestias dolores minima! Ipsam aspernatur, soluta, officia in quae est expedita mollitia illum qui animi corrupti ullam voluptate exercitationem nobis repellat praesentium?
                Illo ab ex eos amet atque, sed iusto. Atque ex itaque nam quos optio veritatis ipsa labore nemo provident praesentium, illo vitae dolor corrupti! Illo nobis deserunt ducimus fugit mollitia.</p>
            </div>
            <div>
              <form action="" onSubmit={handleSubmit}>
                <div className='py-2'>
                  <label htmlFor="">First Name: </label>
                  <input type="text" onBlur={handleBlur} value={values.firstName} onChange={handleChange} name="firstName" className='form-control' />
                  {touched.firstName && errors.firstName &&
                    <small className='text-danger fw-bold'>{errors.firstName}</small>
                  }
                </div>

                <div className='py-2'>
                  <label htmlFor="">Last Name: </label>
                  <input type="text" onBlur={handleBlur} value={values.lastName} onChange={handleChange} name="lastName" className='form-control' />
                  {touched.lastName && errors.lastName &&
                    <small className='text-danger fw-bold'>{errors.lastName}</small>
                  }
                </div>

                <div className='py-2'>
                  <label htmlFor="">Email: </label>
                  <input type="email"  value={currentUser.email}  name="" className='form-control' />                  
                </div>
                <div className='py-2'>
                  <div>
                    <label htmlFor="">Upload CV: </label>
                    <div className='d-flex'>
                      <div className='w-50 me-2'>
                        <input type="file" name="" id="" className='form-control w-100' onChange={(e) => uploadCV(e)} accept=".pdf, .docx" />
                      </div>
                      {
                        isUpload ?
                          <div className='btn btn-primary' type='submit' onClick={uploadFileURL}>Upload</div>
                          :
                          null
                      }
                    </div>
                    <div>
                      {
                        response
                          ?
                          <h6 className='text-success'>{response.message}</h6>
                          :
                          null
                      }
                    </div>
                  </div>
                </div>

                <div className='d-flex align-items-center'>
                  <div className='py-2'>
                    <button disabled={submitApplication} className='btn btn-success' type='submit'>Submit Application</button>
                  </div>

                  <div className='ms-4'>
                    <div className='btn border-success'>Back</div>
                  </div>
                </div>

              </form>



            </div>


          </div>
        }
      />

    </>
  )
}

export default ApplyForJob