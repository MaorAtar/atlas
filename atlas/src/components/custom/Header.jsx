import React, { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { RiDashboard3Line } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { CiViewTimeline } from "react-icons/ci";
import { Plus, LogIn, Menu } from "lucide-react";
import { PiEyesFill } from "react-icons/pi";
import "typeface-audiowide";

function Header() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
            fontFamily: "Audiowide, sans-serif",
            color: "#0e1318",
            letterSpacing: "0.1em",
          }}
        >
          ATLAS
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <SignedOut>
          <a href="/view-trip/1736182019702">
            <Button
              variant="solid"
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <PiEyesFill className="w-4 h-4" />
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
          {user?.publicMetadata?.role === "admin" && (
            <>
              <a href="/admin-dashboard">
                <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 hover:scale-105">
                  <RiDashboard3Line className="w-4 h-4" /> Dashboard
                </Button>
              </a>
              <a href="/admin-manage-users">
                <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 hover:scale-105">
                  <MdManageAccounts className="w-4 h-4" /> Manage Users
                </Button>
              </a>
              <a href="/admin-all-trips">
                <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 hover:scale-105">
                  <CiViewTimeline className="w-4 h-4" /> All Trips
                </Button>
              </a>
            </>
          )}

          <a href="/create-trip">
            <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 hover:scale-105">
              <Plus className="w-4 h-4" /> Create Trip
            </Button>
          </a>
          <a href="/my-trips">
            <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-md px-4 py-1 h-8 text-sm flex items-center gap-2 hover:scale-105">
              My Trips
            </Button>
          </a>

          <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          <Menu className="w-8 h-8 text-gray-800" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-4 z-50">
          <SignedOut>
            <a href="/view-trip/1736182019702">
              <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                Example Trip
              </Button>
            </a>
            <SignInButton mode="modal">
              <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {user?.publicMetadata?.role === "admin" && (
              <>
                <a href="/admin-dashboard">
                  <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                    Dashboard
                  </Button>
                </a>
                <a href="/admin-manage-users">
                  <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                    Manage Users
                  </Button>
                </a>
                <a href="/admin-all-trips">
                  <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                    All Trips
                  </Button>
                </a>
              </>
            )}
            <a href="/create-trip">
              <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white w-64">
                My Trips
              </Button>
            </a>
            <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
          </SignedIn>
        </div>
      )}
    </header>
  );
}

export default Header;
