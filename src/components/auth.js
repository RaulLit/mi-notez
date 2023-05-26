import { useState } from "react";
import { auth, provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    signOut(auth)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-container">
      <div className="auth">
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <button onClick={handleSignIn} className="btn">
          Sign in
        </button>
        <button onClick={signInWithGoogle} className="btn">
          Sign In With Google
        </button>
        {auth.currentUser && (
          <button onClick={logout} className="btn">
            Log out
          </button>
        )}
      </div>
    </div>
  );
};
