import { UserProfile, SignOutButton } from '@clerk/nextjs';
import React from 'react';

function Settings() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      {/* User Profile Section */}
      <UserProfile />

      {/* Sign Out Button with redirect to homepage */}
      <SignOutButton redirectUrl="/">
        <button className="mt-4 px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300 ease-in-out">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}

export default Settings;
