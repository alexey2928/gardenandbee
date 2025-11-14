import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/admin"; // redirect after login
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
          required
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
