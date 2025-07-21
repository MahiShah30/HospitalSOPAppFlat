"use client"; 

import React, { useState } from 'react';
import { auth } from '../../firebase'; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 

export default function AuthPage() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || (tab === 'register' && !form.name)) {
      setError('All fields are required');
      return;
    }
    setError('');

    try {
      if (tab === 'register') {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: form.name
          });
        }
        alert('Registration successful!');
        router.push('/dashboard'); // Use router.push for navigation
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert('Login successful!');
        router.push('/dashboard'); // Use router.push for navigation
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    setResetMsg('');
    if (!resetEmail) {
      setError('Please enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMsg('Reset link sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setTab('login');
              setShowReset(false);
            }}
            className={`px-4 py-2 rounded ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600 text-blue-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setTab('register');
              setShowReset(false);
            }}
            className={`px-4 py-2 rounded ${tab === 'register' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600 text-blue-600'}`}
          >
            Register
          </button>
        </div>

        {!showReset ? (
          <div className="flex flex-col gap-4">
            {tab === 'register' && (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 border rounded"
              />
            )}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 border rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-3 border rounded w-full"
              />
              <span
                className="absolute right-3 top-3 text-sm text-blue-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>

            {tab === 'login' && (
              <div className="text-right text-sm">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setShowReset(true)}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {tab === 'login' ? 'Login' : 'Register'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center">Reset Password</h2>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-3 border rounded"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {resetMsg && <p className="text-green-600 text-sm">{resetMsg}</p>}
            <button
              onClick={handlePasswordReset}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setShowReset(false)}
              className="text-sm text-blue-500 hover:underline"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </div>

      {/* Back to homepage button - using Next.js Link component */}
      <Link
        href="/" // Next.js Link uses 'href' prop, not 'to'
        className="mt-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Homepage
      </Link>
    </div>
  );
}