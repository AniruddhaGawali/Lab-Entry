import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
        <TailSpin
  height="100"
  width="100"
  color="#47B5FF"
  ariaLabel="tail-spin-loading"
  radius="1"
  visible={true}
/>
    </div>
  )
}

export default Loading