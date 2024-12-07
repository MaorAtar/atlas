import React from 'react'
import { Button } from '../ui/button'

function Header() {
    return (
      <div className='w-full p-3 shadow-sm flex justify-between items-center px-5'>
          <img src='/atlas-icon.svg' height={100} width={100}/>
          <div>
              <Button>Sign In</Button>
          </div>
      </div>
    )
  }
  

export default Header