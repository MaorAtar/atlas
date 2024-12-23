import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import { Plus, LogIn } from 'lucide-react';
import 'typeface-audiowide'; // Importing Audiowide font

function Header() {
  const { user } = useUser();

  return (
    <header className="w-full shadow-md bg-white flex justify-between items-center px-6 h-20">
      {/* Atlas Logo */}
      <a href="/" className="flex items-center gap-3">
        <img
          src="/atlas-icon.svg"
          alt="Atlas Icon"
          className="h-20 w-20 drop-shadow-lg"
        />
        <span
          className="text-3xl font-bold tracking-widest"
          style={{
            fontFamily: 'Audiowide, sans-serif',
            color: '#0e1318',
            letterSpacing: '0.1em',
          }}
        >
          ATLAS
        </span>
      </a>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="solid"
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* Create Trip Button */}
          <a href="/create-trip">
            <Button
              variant="solid"
              className="rounded-full bg-gradient-to-r from-teal-500 to-green-400 hover:from-teal-600 hover:to-green-500 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Create Trip
            </Button>
          </a>

          {/* My Trips Button */}
          <a href="/my-trips">
            <Button
              variant="solid"
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              My Trips
            </Button>
          </a>

          {/* User Icon */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
