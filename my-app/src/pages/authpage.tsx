import React, { useCallback, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden focusable="false">
    <path fill="#EA4335" d="M24 9.5c3.9 0 7 1.4 9.1 3.2l6.8-6.8C35.8 2 30.2 0 24 0 14.7 0 6.9 4.8 2.7 11.8l7.9 6.2C12.6 12.2 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.6H24v9.1h12.7c-.5 2.7-2 5-4.3 6.6l6.7 5.2C44.5 36 46.5 30.5 46.5 24z"/>
    <path fill="#4A90E2" d="M10.6 29.9A14.6 14.6 0 0 1 10 24c0-1.7.3-3.3.7-4.9L2.8 12C.9 15.5 0 19.6 0 24c0 4.7 1 9.1 2.8 12.9l7.8-6z"/>
    <path fill="#FBBC05" d="M24 48c6.2 0 11.8-2.1 16-5.7l-7.8-6c-2.2 1.5-5 2.5-8.3 2.5-6.3 0-11.5-2.6-14.6-6.6L2.7 36.2C6.9 43.2 14.7 48 24 48z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const Shine = () => (
  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
);

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Successfully signed in! Redirecting...");
    } catch (e: any) {
      setError("Wrong email/password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await signInWithPopup(auth, new GoogleAuthProvider());
      setSuccess("Successfully signed in with Google! Redirecting...");
    } catch (e: any) {
      setError("Unable to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const provider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, provider);
      setSuccess("Successfully signed in with Apple! Redirecting...");
    } catch (e: any) {
      setError("Unable to sign in with Apple. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdbfc2]">
      <div className="flex items-center justify-center p-6 relative">
        <div className="w-full max-w-[400px] bg-white rounded-2xl p-12 text-center shadow-[0_20px_25px_-5px_rgba(0,0,0,.1),_0_10px_10px_-5px_rgba(0,0,0,.04)] border border-white/20">
          <header className="mb-8">
            <img src="https://firebasestorage.googleapis.com/v0/b/gutter-bc42f.appspot.com/o/Black%20logo%20-%20no%20background.png?alt=media&token=91786a19-154b-4324-8414-a7154a9840d2" alt="Logo" className="w-24 h-24 mx-auto mb-8" />
          </header>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              {success}
            </div>
          )}

          <div className="flex flex-col gap-4 mt-1">
            <div className="flex flex-col gap-4 mb-1">
              <input type="email" placeholder="Email address" aria-label="Email address" value={email} onChange={e => setEmail(e.target.value)} className="h-14 rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 text-[15px] font-medium text-[#1a202c] outline-none transition focus:bg-white focus:border-[#ff6f73] focus:ring-4 focus:ring-[rgba(255,111,115,0.1)]" />
              <input type="password" placeholder="Password" aria-label="Password" value={password} onChange={e => setPassword(e.target.value)} className="h-14 rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 text-[15px] font-medium text-[#1a202c] outline-none transition focus:bg-white focus:border-[#ff6f73] focus:ring-4 focus:ring-[rgba(255,111,115,0.1)]" />
              <button onClick={handleEmailSignIn} disabled={loading} className="relative group overflow-hidden h-14 rounded-xl bg-gradient-to-br from-[#ff6f73] to-[#ff4757] text-white text-[15px] font-semibold shadow-[0_4px_15px_rgba(255,111,115,0.4)] transition hover:shadow-[0_12px_30px_rgba(255,71,87,0.45)] hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed">
                <Shine />
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </div>

            <button onClick={handleGoogleSignIn} disabled={loading} className="relative group overflow-hidden h-14 rounded-xl bg-gradient-to-br from-[#4285f4] to-[#3367d6] text-white text-[15px] font-semibold shadow-[0_4px_15px_rgba(66,133,244,0.4)] transition hover:shadow-[0_12px_30px_rgba(66,133,244,0.45)] hover:scale-[1.02] active:scale-100 inline-flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
              <Shine />
              <span className="inline-flex items-center justify-center w-5 h-5"><GoogleIcon /></span>
              <span>Sign in with Google</span>
            </button>

            <button onClick={handleAppleSignIn} disabled={loading} className="relative group overflow-hidden h-14 rounded-xl bg-black text-white text-[15px] font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:scale-[1.02] active:scale-100 inline-flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
              <Shine />
              <span className="inline-flex items-center justify-center w-5 h-5"><AppleIcon /></span>
              <span>Sign in with Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />
            <span className="text-[13px] text-[#64748b]">or</span>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />
          </div>

          <p className="text-[14px] text-[#64748b] mt-2">
            Don't have an account?
            <a href="/signup" className="ml-1 font-semibold text-[#ff6f73] hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
