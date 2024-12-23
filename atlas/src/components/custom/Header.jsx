import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';

function Header() {
  const { user } = useUser();

  return (
    <div className="w-full shadow-sm flex justify-between items-center px-5 h-16">
      {/* Atlas Logo */}
      <a href="/">
        <img
          src="/atlas-icon.svg"
          alt="Atlas Icon"
          height={70}
          width={70}
          className="cursor-pointer"
        />
      </a>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </a>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
