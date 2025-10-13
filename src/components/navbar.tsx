"use client";

import {SignOutButton, useUser} from "@clerk/nextjs";

import Logo from "./logo";
import {ThemeSwitch} from "./theme-switch";
import UploadButton from "./upload/upload-button";

const Navbar = () => {
  const {isSignedIn} = useUser();

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-4 backdrop-blur-md lg:px-8">
      <Logo />

      <div className="flex items-center gap-2.5">
        <ThemeSwitch />

        <div className="flex min-w-8 items-center gap-2.5">
          <UploadButton />

          {isSignedIn && (
            <SignOutButton>
              <button className="cursor-pointer rounded-full py-1.5 bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white hover:shadow-lg transition-all duration-300 hover:from-pink-600 hover:via-pink-700 hover:to-pink-800">
                Logout
              </button>
            </SignOutButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
