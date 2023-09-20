import React, { useState } from 'react'
import EmployerSignUp from './Employer/EmployerSignUp'
import JobSeekerSignUp from './JobSeeker/JobSeekerSignUp'
import Loader from './Loader'


function SignUp() {

    const [isVisible, setisVisible] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [isSpinning, setisSpinning] = useState(false)

    const registerAsJobSeeker = () => {
        setisSpinning(!isSpinning)
        setTimeout(() => {
            setisVisible(!isVisible)
            setisSpinning(!isSpinning)
        }, 1500);
    }

    const registerAsEmployer = () => {
        setisSpinning(!isSpinning)
        setTimeout(() => {
            setisVisible(!isVisible)
            setisSpinning(!isSpinning)
        }, 1500);
    }

    return (
        <>
            <div className='body d-flex align-items-center justify-content-center'>
                <div className='shadow rounded p-4 signup-box'>
                    {isVisible ? 
                    <EmployerSignUp registerAsJobSeeker={registerAsJobSeeker} 
                    setisLoading={setisLoading} 
                    isSpinning={isSpinning}
                    /> 
                    : <JobSeekerSignUp registerAsEmployer={registerAsEmployer} 
                    setisLoading={setisLoading} 
                    isSpinning={isSpinning}
                    />}
                </div>
            </div>
            {
                isLoading 
                    ?
            <div className='position-absolute loader-div w-100 d-flex align-items-center justify-content-center'>
                <Loader />
            </div>
                    :
                    null
            }
        </>
    )
}

export default SignUp