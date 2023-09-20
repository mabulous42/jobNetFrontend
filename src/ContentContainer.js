import React from 'react'

function ContentContainer(props) {
  return (
    <>
    <div>
      <div className='content-container overflow-auto'>
        <div className='cover-banner d-flex align-items-center justify-content-between'>
          <h6 className='text-white '>{props.pageName}</h6>
          <div className='text-white d-flex align-items-center'>
            <p className='me-2'>Home</p>
            <p className='me-2'>‣</p>
            <p className='me-2'>Dashboard</p>
            <p className='me-2'>{props.Arrow}</p>
            <p className='me-2'>{props.pageDirectory}</p>
            <p className='me-2'>{props.Arrow2}</p>
            <p>{props.pageDirectory2}</p>
          </div>
        </div>
        <div className='inner-content-div py-5'>
          <div className='new-div'>
            {props.employerDashboard}
            {props.userDashboard}
            {props.postJob}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ContentContainer