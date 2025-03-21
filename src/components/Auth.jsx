import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login, logout } from "../firebase";

const Auth = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Spotify Clone</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
          <p>{user.displayName}</p>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <button onClick={login} className="bg-green-500 px-4 py-2 rounded">Login with Google</button>
      )}
    </div>
  );
};

export default Auth;
