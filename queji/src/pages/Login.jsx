import React from "react";
import Background from "../components/background";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";

function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        console.log("User signed in: ", result.user);
        // You can redirect or perform other actions here
      }
    } catch (error) {
      console.error(
        "Error during sign in: ",
        error.code,
        error.message,
        error.email,
        error.credential
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Background />
      <div className="bg-black z-50 border p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-5xl text-white font-bold mb-6">Login</h1>

        <button
          className="w-full py-2 bg-white disabled:cursor-not-allowed border-none rounded-sm text-gray-800"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </div>
    </div>
  );
}

export default Login;
