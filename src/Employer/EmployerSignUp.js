import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SpinnerLoader from '../SpinnerLoader'
import { router } from '../Router/Router'

function EmployerSignUp({ registerAsJobSeeker, setisLoading, isSpinning }) {
    const navigate = useNavigate()
    const onSubmit = (values, errors) => {
        setisLoading(true)
        setTimeout(() => {
            setisLoading(false)
        }, 1990);
        setTimeout(() => {
            if (values.password !== values.confirmPassword) {
                alert("Password does not matched")
                return
            } else {
                const uri = `${router}/users/registerAsEmployer`
                axios.post(uri, values).then((res) => {
                    console.log(res);
                    alert(res.data.message)
                    navigate("/employerLogin")
                }).catch((err) => {
                    console.log(err);
                    alert(err.response.data.message)
                })
            }
        }, 2000);
    }

    const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
        initialValues: {
            employerName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object().shape({
            employerName: yup.string()
                .min(2, "Employer name is too short")
                .max(50, "Employer name is too long")
                .required("Employer name cannot be empty")
                .matches(/^[a-zA-Z0-9]+$/, "Employer Name should not contain special characters"),
            email: yup.string()
                .email()
                .required("This input cannot be empty"),
            password: yup.string().required("This input cannot be empty")
                .min(8, "should be at least 8 characters")
                .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/, "Password should contain at least an Upper case, number and a special character"),
            confirmPassword: yup.string().required("This input cannot be empty")
                .min(8, "should be at least 8 characters")
        }),
        onSubmit
    })

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    };


    return (
        <>
            <div className='position-relative'>
                <form action="" onSubmit={handleSubmit}>
                    <h4 className='text-center py-2'>Register as an Employer</h4>
                    <div className='my-3'>
                        <input type="text" onBlur={handleBlur} value={values.employerName} onChange={handleChange} placeholder='Employer Name' name="employerName" className='form-control' />
                        {touched.employerName && errors.employerName &&
                            <small className='text-danger fw-bold'>{errors.employerName}</small>
                        }
                    </div>
                    <div className='my-3'>
                        <input type="email" onBlur={handleBlur} value={values.email} onChange={handleChange} placeholder='Employer Email' name="email" className='form-control' />
                        {touched.email && errors.email &&
                            <small className='text-danger fw-bold'>{errors.email}</small>
                        }
                    </div>
                    <div className='my-3'>
                        <input type="password" onBlur={handleBlur} value={values.password} onChange={handleChange} placeholder='Password' name="password" className='form-control' />
                        {touched.password && errors.password &&
                            <small className='text-danger fw-bold'>{errors.password}</small>
                        }
                    </div>
                    <div className='my-3'>
                        <input type="password" onBlur={handleBlur} value={values.confirmPassword} onChange={handleChange} placeholder='Confirm Password' name="confirmPassword" className='form-control' />
                        {touched.confirmPassword && errors.confirmPassword &&
                            <small className='text-danger fw-bold'>{errors.confirmPassword}</small>
                        }
                    </div>
                    <div className='d-flex'>
                        <div>
                            <input onChange={handleCheckboxChange} className='check-box' type="checkbox" name="" id="" />
                        </div>
                        <p className='ms-2 terms'>I agree with JobNet's Terms of Service, Privacy Policy, and default Notification Settings.</p>
                    </div>
                    <div className='text-center'>
                        <button disabled={!isCheckboxChecked} type="submit" className='btn btn-success'>Create Account</button>
                    </div>
                    <div>
                        <small>To register as a Job Seeker, <span onClick={registerAsJobSeeker} className='text-primary job-seeker'>Click here</span></small>
                    </div>
                </form>
                <div className='position-absolute small-loader w-100'>
                    {isSpinning ? <SpinnerLoader /> : null}
                </div>
            </div>
        </>
    )
}

export default EmployerSignUp