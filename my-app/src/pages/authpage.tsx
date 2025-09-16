import React, { useCallback } from "react";


/**
 * Props: optionally provide handlers or a backend base URL
 */
type AuthPageProps = {
  backendBaseUrl?: string; // e.g., "https://api.throwly.com"
  onNavigate?: (path: string) => void;
};

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden focusable="false">
    <path fill="#EA4335" d="M24 9.5c3.9 0 7 1.4 9.1 3.2l6.8-6.8C35.8 2 30.2 0 24 0 14.7 0 6.9 4.8 2.7 11.8l7.9 6.2C12.6 12.2 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.6H24v9.1h12.7c-.5 2.7-2 5-4.3 6.6l6.7 5.2C44.5 36 46.5 30.5 46.5 24z"/>
    <path fill="#4A90E2" d="M10.6 29.9A14.6 14.6 0 0 1 10 24c0-1.7.3-3.3.7-4.9L2.8 12C.9 15.5 0 19.6 0 24c0 4.7 1 9.1 2.8 12.9l7.8-6z"/>
    <path fill="#FBBC05" d="M24 48c6.2 0 11.8-2.1 16-5.7l-7.8-6c-2.2 1.5-5 2.5-8.3 2.5-6.3 0-11.5-2.6-14.6-6.6L2.7 36.2C6.9 43.2 14.7 48 24 48z"/>
  </svg>
);

const APPLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const AuthPage: React.FC<AuthPageProps> = ({ backendBaseUrl = "", onNavigate }) => {
  // Handlers (wire these up to your backend)
  const handleEmailSignIn = useCallback(() => {
    // navigate to an email sign in form or show a modal
    if (onNavigate) onNavigate("/signin-email");
    else window.location.href = "/signin-email";
  }, [onNavigate]);

  const handleSignUp = useCallback(() => {
    if (onNavigate) onNavigate("/register");
    else window.location.href = "/register";
  }, [onNavigate]);

  // Example: If you use @react-oauth/google, you'll get a credential/jwt from Google and then POST it to your backend.
  // Here is a small helper that sends the googleCredential (id_token) to the backend endpoint.
  const sendGoogleTokenToBackend = useCallback(
    async (googleIdToken: string) => {
      try {
        const res = await fetch(`${backendBaseUrl}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: googleIdToken }),
          credentials: "include",
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Google login failed");
        }
        const data = await res.json();
        // expected: backend returns your app token/session
        // store token (example)
        localStorage.setItem("throwly_token", data.token);
        // redirect to homepage
        window.location.href = "/";
      } catch (err) {
        console.error("Google login error:", err);
        alert("Google sign-in failed. Check console for details.");
      }
    },
    [backendBaseUrl]
  );

  // UI-only: If you want to integrate with @react-oauth/google:
  //
  // import { GoogleLogin } from '@react-oauth/google';
  // <GoogleLogin
  //   onSuccess={credentialResponse => sendGoogleTokenToBackend(credentialResponse.credential)}
  //   onError={() => console.log('Google login failed')}
  // />
  //
  // For now, the "Sign in with Google" button onClick below is a placeholder that expects you to wire actual GIS logic.

  const handleGoogleClick = useCallback(() => {
    // Placeholder flow: Open a new tab to begin your OAuth flow OR trigger the client-side flow from @react-oauth/google.
    // Example placeholder:
    alert("Client-side Google flow should start here. Replace this handler with @react-oauth/google integration.");
  }, []);

  const handleAppleClick = useCallback(() => {
    alert("Apple Sign In flow should start here (if backend supports it).");
  }, []);

  return (
    <div className="auth-root">
      <div className="auth-card" role="main" aria-labelledby="auth-title">
        <header className="auth-header">
          <img src="/throwly-logo.svg" alt="Throwly logo" className="auth-logo" />
          <h1 id="auth-title" className="auth-title">THROWLY</h1>
          <p className="auth-tagline">Mind what you throw</p>
        </header>

        <div className="auth-actions">
          <div className="email-form">
            <input
              type="email"
              placeholder="Email address"
              className="email-input"
              aria-label="Email address"
            />
            <input
              type="password"
              placeholder="Password"
              className="password-input"
              aria-label="Password"
            />
            <button
              className="btn btn-pink"
              onClick={handleEmailSignIn}
              aria-label="Sign in"
            >
              Sign In
            </button>
          </div>

          <button
            className="btn btn-google"
            onClick={handleGoogleClick}
            aria-label="Sign in with Google"
          >
            <span className="btn-icon">{GOOGLE_ICON}</span>
            <span>Sign in with Google</span>
          </button>

          <button
            className="btn btn-apple"
            onClick={handleAppleClick}
            aria-label="Sign in with Apple"
          >
            <span className="btn-icon">{APPLE_ICON}</span>
            <span>Sign in with Apple</span>
          </button>
        </div>

        <div className="divider">
          <span className="line" aria-hidden></span>
          <span className="or">or</span>
          <span className="line" aria-hidden></span>
        </div>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <button className="signup-link" onClick={handleSignUp}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
