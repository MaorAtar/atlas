import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center mx-56 gap-9'>
        <h1
        className='font-extrabold text-[50px] text-center mt-16'
        >
          <span className='text-[#38bdf8]'>
          Discover Your Next Adventure with AI:
          </span>
          <br/>
          Personalized Itineraries at Your Finertips</h1>
          <p className='text-xl text-gray-500 text-center'>
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
          <Link to={'/create-trip'}>
            <Button>Get Started!</Button>
          </Link>
    </div>
  )
}

export default Hero