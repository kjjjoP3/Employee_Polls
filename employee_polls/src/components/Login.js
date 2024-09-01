import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers } from "../reducers/authenSlice";
import { currentUser } from "../reducers/currentUserSlice";

// import 'primeflex/primeflex.css';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const allUser = useSelector((state) => state.allUser);

  const path = location?.pathname;
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(path)
  const handleClick = (event) => {
    setPassword(password);
    setUsername(username);
    if(username && password) {
      const user = Object.entries(allUser.value).filter(
        (val) => val[1].id === username && val[1].password === password
      );
      if (user && user.length) {
        dispatch(currentUser(user[0]));
        setError(false);
        setSuccess(true);
       if(path == '/') navigate('/home')
       else navigate(path, { replace: true });
        
      } else {
        setError(true);
        setSuccess(false);
      }
    }
    else {
      setError(true);
      setSuccess(false);
    }
    
  };
  return (
    <div
      className="card"
      style={{
        position: "absolute",
        width: "100%",
        top: "50%",
        textAlign: "center",
        transform: "translateY(-50%)",
      }}
    >
      <div className="text-center">
        <h1>Employee Polls</h1>
        <h1>Login</h1>
        {error && (
          <div className="error" data-testid="fail-id">
            <small>Incorect Username or Password</small>
          </div>
        )}
        {success && (
          <div className="success" data-testid="success-id">
            <small>Success login</small>
          </div>
        )}
      </div>

      <div  style={{ marginBottom: "10px" }}>
        <span>
          <label style={{ marginRight: "8px" }} htmlFor="username">
            Username
          </label>
          <input data-testid="username-input"
            style={{ padding: "8px" }}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span className="p-float-label">
          <label style={{ marginRight: "8px" }} htmlFor="password">
            Password
          </label>
          <input data-testid="password-input"
            style={{ padding: "8px" }}
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
      </div>
      <div>
        <input type="submit" onClick={handleClick} data-testid='submit' value="Login"/>
      </div>
    </div>
  );
};