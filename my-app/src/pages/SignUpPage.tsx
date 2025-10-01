// SignUpPage.tsx
import React, { useEffect, useRef, useState } from "react";
// adjust this import path to where you put firebaseAuthHelpers.ts
import { isUsernameUnique, uploadImage, signUp } from "./firebaseAuthHelpers";

const Shine = () => (
  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
);

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState(""); // optional sex
  const [birthday, setBirthday] = useState(""); // renamed from dob to match database
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // debounce ref for username uniqueness checks
  const debounceRef = useRef<number | null>(null);

  // Validate username format locally: letters, numbers, underscore, 3-20 chars
  const validateUsername = (u: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(u);
  };

  // Debounced username change handler (fires async check after 500ms idle)
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError("");
    setUsernameAvailable(null);

    // immediate format validation
    if (!value) {
      setUsernameError("");
      return;
    }
    if (!validateUsername(value)) {
      setUsernameError("Username must be 3-20 characters: letters, numbers, and underscores only");
      return;
    }

    // debounce uniqueness check to reduce reads while typing
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(async () => {
      try {
        const ok = await isUsernameUnique(value);
        setUsernameAvailable(ok);
        if (!ok) setUsernameError("Username is already taken");
      } catch (err) {
        console.error("Username check error", err);
        setUsernameAvailable(null);
        setUsernameError("Unable to check username right now");
      }
    }, 500);
  };

  // profile file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setProfilePic(f);
  };

  // Helper: final client-side validation before attempting signup
  const validateBeforeSubmit = () => {
    setError("");
    setSuccess("");

    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!validateUsername(username.trim())) {
      setError("Username must be 3-20 characters: letters, numbers, and underscores only");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    // sex, birthday, and location are optional
    return true;
  };

  const handleEmailSignUp = async () => {
    setError("");
    setSuccess("");

    if (!validateBeforeSubmit()) return;

    setLoading(true);
    try {
      const usernameLower = username.trim().toLowerCase();

      // Final (server-ish) uniqueness pre-check (UX). We still handle race on signUp server side.
      const available = await isUsernameUnique(usernameLower);
      if (!available) {
        setError("Username already taken. Please choose another.");
        setLoading(false);
        return;
      }

      // Upload profile pic first (if provided)
      let profilePicUrl: string | null = null;
      if (profilePic) {
        // choose a stable storage path name
        const safeName = `profilePics/${usernameLower}_${Date.now()}_${profilePic.name}`;
        profilePicUrl = await uploadImage(profilePic, safeName);
      }

      // Call signUp helper with all the required fields
      await signUp({
        email: email.trim().toLowerCase(),
        password,
        username: usernameLower,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        profilePicture: profilePicUrl,
        sex: sex || null,
        birthday: birthday || null,
        numListings: 0,
        score: 50,
        preferences: {}, // new field - empty object for now
        isPrivateEmail: false, // new field - default to false
        shouldUpdateProfile: false, // new field - default to false
      });

      setLoading(false);

      // Optionally: redirect to login page after short delay
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: any) {
      console.error("Sign up failed:", err);
      // known helper errors
      if (err.code === "USERNAME_TAKEN" || err.message === "USERNAME_TAKEN") {
        setError("Username was just taken. Please choose another.");
      } else if (err.code === "EMAIL_IN_USE" || err.message === "EMAIL_IN_USE") {
        setError("An account with this email already exists. Please sign in instead.");
      } else {
        setError(err.message || "Sign up failed. Try again.");
      }
      setLoading(false);
    }
  };

  // cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  // single base input class used for text/email/password/select/date/file so visuals match
  const baseInputClass =
    "h-14 rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 text-[15px] font-medium placeholder-[#9CA3AF] outline-none transition focus:bg-white focus:border-[#ff6f73] focus:ring-4 focus:ring-[rgba(255,111,115,0.1)]";

  return (
    <div className="min-h-screen bg-[#fdbfc2]">
      {/* small scoped CSS so selects/date look like other inputs (gray, not bold) */}
      <style>{`
        .form-input, .form-select, .form-file {
          color: #6b7280; /* gray text like email/password fields */
          font-weight: 500; /* slightly medium, not heavy black */
        }
        /* placeholder color */
        .form-input::placeholder {
          color: #9CA3AF;
          opacity: 1;
        }
        /* make the disabled placeholder option gray */
        .form-select option[disabled] {
          color: #9CA3AF;
        }
        /* date inputs on many browsers render native picker; ensure text color */
        input[type="date"].form-input {
          color: #6b7280;
        }
      `}</style>

      <div className="flex items-center justify-center p-6 relative">
        <div className="w-full max-w-[400px] bg-white rounded-2xl p-12 text-center shadow-lg border border-white/20">
          <header className="mb-8">
            <img src="https://firebasestorage.googleapis.com/v0/b/gutter-bc42f.appspot.com/o/Black%20logo%20-%20no%20background.png?alt=media&token=91786a19-154b-4324-8414-a7154a9840d2" alt="Logo" className="w-24 h-24 mx-auto mb-8" />
          </header>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">{success}</div>}

          <div className="flex flex-col gap-4 mt-1">
            <div className="flex flex-col gap-4 mb-1">
              <input
                type="text"
                placeholder="First Name *"
                aria-label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${baseInputClass} form-input`}
              />
              
              <input
                type="text"
                placeholder="Last Name *"
                aria-label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${baseInputClass} form-input`}
              />

              <input
                type="text"
                placeholder="Username *"
                aria-label="Username"
                value={username}
                onChange={handleUsernameChange}
                className={`${baseInputClass} form-input`}
              />
              {usernameError && <p className="text-red-500 text-xs text-left -mt-2">{usernameError}</p>}
              {usernameAvailable && <p className="text-green-600 text-xs text-left -mt-2">Username available</p>}

              <input type="email" placeholder="Email address *" value={email} onChange={e => setEmail(e.target.value)} className={`${baseInputClass} form-input`} />
              
              {/* Password field with toggle */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password *" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className={`${baseInputClass} form-input w-full pr-12`} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-[#ff6f73] hover:text-[#ff4757] text-sm font-medium focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password field with toggle */}
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm Password *" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  className={`${baseInputClass} form-input w-full pr-12`} 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-[#ff6f73] hover:text-[#ff4757] text-sm font-medium focus:outline-none"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              
    

              {/* Sex (optional) */}
              <select value={sex} onChange={(e) => setSex(e.target.value)} className={`${baseInputClass} form-select`}>
                <option value="" disabled>Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              {/* Birthday (optional) */}
              <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className={`${baseInputClass} form-input`} placeholder="Birthday (optional)" />

              {/* Profile picture (optional) */}
              <div className="text-left">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="w-full h-12 px-4 py-2 text-sm text-gray-600 bg-gray-50 border-2 border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#ff6f73] file:text-white hover:file:bg-[#ff4757] focus:outline-none focus:ring-4 focus:ring-[rgba(255,111,115,0.1)] focus:border-[#ff6f73] transition-colors" 
                />
                {profilePic && <p className="text-xs text-gray-500 mt-1">Selected: {profilePic.name}</p>}
                {!profilePic && <p className="text-xs text-gray-500 mt-1">No file chosen</p>}
              </div>

              <button onClick={handleEmailSignUp} disabled={loading || !!usernameError} className="relative group overflow-hidden h-14 rounded-xl bg-gradient-to-br from-[#ff6f73] to-[#ff4757] text-white text-[15px] font-semibold">
                <Shine />
                {loading ? "Creating Account…" : "Sign Up"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {/* social sign-ups left as-is */}
          </div>

          <p className="text-sm text-[#64748b] mt-6">
            Already have an account? <a href="/login" className="font-semibold text-[#ff6f73] hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
