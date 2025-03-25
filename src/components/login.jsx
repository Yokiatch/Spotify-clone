import { AUTH_URL } from "../spotify";

const Login = () => {
  return (
    <div className="container text-center mt-5">
      <a 
        href={AUTH_URL} 
        className="btn btn-success mt-3"
        target="_blank" 
        rel="noopener noreferrer"
      >
        Login with Spotify
      </a>
    </div>
  );
};

export default Login;
