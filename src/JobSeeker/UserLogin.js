import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { router } from '../Router/Router';

function UserLogin() {
    const navigate = useNavigate()


    const onSubmit = (values) => {
        console.log(values);
        const uri = `${router}/users/userLogin`
        axios.post(uri, values).then((res) => {
            console.log(res);
            localStorage.setItem("token", JSON.stringify(res.data.token))
            alert("Login Successful")
            navigate("/jobSeekerDashboard")
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.message)
        })
    }

    const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .email()
                .required("This input cannot be empty"),
            password: yup.string().required("This input cannot be empty")
                .min(8, "should be at least 8 characters")
        }),
        onSubmit
    })
    return (
        <>
            <div className='body d-flex align-items-center justify-content-center'>
                <div className='shadow rounded p-4 signup-box'>
                    <form onSubmit={handleSubmit} action="">
                        <h3 className='mx-auto text-muted text-center'>Job Seeker Login</h3>
                        <div className='my-3'>
                            <input type="email" onBlur={handleBlur} name='email' value={values.email} onChange={handleChange} placeholder='Email' className={errors.email ? "is-invalid form-control" : "form-control"} />
                            {touched.email && errors.email &&
                                <small className='text-danger fw-bold'>{errors.email}</small>
                            }
                        </div>
                        <div className='my-3'>
                            <input type="password" onBlur={handleBlur} name='password' value={values.password} onChange={handleChange} placeholder='Password' className={errors.password ? "is-invalid form-control" : "form-control"} />
                            {touched.password && errors.password &&
                                <small className='text-danger fw-bold'>{errors.password}</small>
                            }
                        </div>
                        <div className='mx-auto col-4 d-flex align-items-center justify-content-center'>
                            <button type='submit' className="btn btn-primary mx-auto">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLogin