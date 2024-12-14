import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react';

function Header() {
  const { user } = useUser();

    return (
      <div className='w-full p-3 shadow-sm flex justify-between items-center px-5'>
          <img src='/atlas-icon.svg' height={100} width={100}/>
          <div>
            <SignedOut>
              <SignInButton mode='modal'/>
            </SignedOut>
            <SignedIn>
              <h1>Welcome Back, {user?.firstName} </h1>
              <UserButton />
            </SignedIn>
          </div>
      </div>
    )
  }
  

export default Header