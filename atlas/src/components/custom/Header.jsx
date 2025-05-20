import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import { RiDashboard3Line } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { CiViewTimeline } from "react-icons/ci";
import { Plus, LogIn } from 'lucide-react';
import { PiEyesFill } from "react-icons/pi";
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
            <a href="/view-trip/1736182019702">
              <Button
                variant="solid"
                className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
              >
                <PiEyesFill  className="w-4 h-4" />
                Example Trip
              </Button>
            </a>

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
          {/* Admin Dashboard */}
          {user?.publicMetadata?.role === "admin" && (
            <a href="/admin-dashboard">
              <Button
                variant="solid"
                className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
              >
                <RiDashboard3Line className="w-4 h-4" />
                Dashboard
              </Button>
            </a>
          )}

          {/* Admin Manage Users */}
          {user?.publicMetadata?.role === "admin" && (
            <a href="/admin-manage-users">
              <Button
                variant="solid"
                className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
              >
                <MdManageAccounts className="w-4 h-4" />
                Manage Users
              </Button>
            </a>
          )}

          {/* Admin View All Trips */}
          {user?.publicMetadata?.role === "admin" && (
            <a href="/admin-all-trips">
              <Button
                variant="solid"
                className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
              >
                <CiViewTimeline className="w-4 h-4" />
                All Trips
              </Button>
            </a>
          )}

          {/* Create Trip Button */}
          <a href="/create-trip">
            <Button
              variant="solid"
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
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
