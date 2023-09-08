import React from 'react'
import spinner from '../assets/spinner.svg'

function Spinner() {
  return (
    <div className='h-24 bg-opacity-50 flex items-center justify-center fixed top-[50%] right-0 bottom-[50%] left-0'>
        <div>
            <img src={spinner} alt="Loading...." />
        </div>
    </div>
  )
}

export default Spinner