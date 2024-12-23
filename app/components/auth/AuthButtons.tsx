'use client';

import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export function AuthButtons() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <button 
          onClick={() => setShowSignIn(true)} 
          className="btn btn-outline btn-sm"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </button>
        <button 
          onClick={() => setShowSignUp(true)} 
          className="btn btn-primary btn-sm"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Sign Up
        </button>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Sign In</h3>
            <SignInForm onClose={() => setShowSignIn(false)} />
          </div>
          <div className="modal-backdrop" onClick={() => setShowSignIn(false)}></div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Sign Up</h3>
            <SignUpForm onClose={() => setShowSignUp(false)} />
          </div>
          <div className="modal-backdrop" onClick={() => setShowSignUp(false)}></div>
        </div>
      )}
    </>
  );
}
