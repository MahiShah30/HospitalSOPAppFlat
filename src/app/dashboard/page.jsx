"use client"; 

import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 

import { Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/auth'); 
      }
    });
    return () => unsubscribe();
  }, [router]); 

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white py-3 px-6 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-center w-full">
          HOSPITAL SOP <span className="text-white">GENERATOR</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 font-semibold px-3 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white shadow-lg flex flex-col justify-between transition-all duration-300 overflow-hidden`}>
          <div>
            <div className="px-6 py-4 border-b flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <h1 className="text-md font-bold text-gray-800 tracking-wide">
                HOSPITAL SOP <span className="text-blue-600">GENERATOR</span>
              </h1>
            </div>
            <div className="px-6 py-2 text-sm text-gray-500">
              Welcome, {user?.displayName || 'Hospital Admin'}!
            </div>
            <nav className="mt-6 space-y-2 px-6">
              {/* IMPT: Use Next.js Link component with href */}
              <Link href="/dashboard" className="block text-blue-600 font-semibold" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
              {/* You'll need to create /generate, /previous, /downloaded, /profile, /settings, /help pages later */}
              {/* For now, ensure these links point to valid routes, or remove/comment them out if not yet created */}
              <Link href="/generate" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Start SOP generation</Link>
              <Link href="/previous" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Previous SOPs</Link>
              <Link href="/downloaded" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Downloaded</Link>
              <Link href="/profile" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>My Profile</Link>
              <Link href="/settings" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Settings</Link>
              <Link href="/help" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Help</Link>
              <Link href="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Back to Home</Link>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6">
          {/* Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Registration Progress</h2>
              <p className="text-sm text-gray-700">10 SOP sections completed</p>
              <div className="mt-2 text-right text-blue-600 text-sm">View Details →</div>
            </div>

            <div className="bg-purple-100 p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">AI Suggestions</h2>
              <p className="text-sm text-gray-700">3 new recommendations based on NABH</p>
              <div className="mt-2 text-right text-purple-600 text-sm">Explore →</div>
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Last Activity</h2>
              <p className="text-sm text-gray-700">Edited SOP: ICU Admission Policy</p>
              <div className="mt-2 text-right text-yellow-600 text-sm">View History →</div>
            </div>
          </div>

          {/* Live Preview or Recent Files */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent SOP Previews</h2>
            <p className="text-gray-600 text-sm mb-2">No recent files yet. Start creating SOPs to see previews here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}