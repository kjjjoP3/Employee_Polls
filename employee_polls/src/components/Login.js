import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers } from "../reducers/authenSlice";
import { currentUser } from "../reducers/currentUserSlice";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [errorVisible, setErrorVisible] = useState(false);
  const usersList = useSelector((state) => state.allUser.value); // Ensure you access the 'value' property
  const loggedInUser = useSelector((state) => state.currentUser.value);

  useEffect(() => {
    if (loggedInUser.length > 0) {
      navigate('/home', { replace: true }); // Redirect logged-in users to home
    } else {
      dispatch(getUsers());
    }
  }, [loggedInUser, dispatch, navigate]);

  const handleLogin = () => {
    const { username, password } = userInput;

    if (username && password) {
      const foundUser = Object.entries(usersList).find(
        ([, user]) => user.id === username && user.password === password
      );

      if (foundUser) {
        dispatch(currentUser(foundUser));
        setErrorVisible(false);
        setUserInput({ username: "", password: "" });
        navigate('/home', { replace: true, state: { success: "Login Successful!" } });
      } else {
        setErrorVisible(true);
      }
    } else {
      setErrorVisible(true);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center vh-100">
      <Card title="Employee Polls" className="shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {errorVisible && (
          <Message severity="error" text="Incorrect Username or Password" />
        )}
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="p-float-label">
              <InputText
                data-testid="username-input"
                id="username"
                value={userInput.username}
                onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
                required
              />
              <label htmlFor="username">Username</label>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="p-float-label">
              <InputText
                data-testid="password-input"
                id="password"
                type="password"
                value={userInput.password}
                onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                required
              />
              <label htmlFor="password">Password</label>
            </label>
          </div>
          <Button
            type="button"
            label="Login"
            className="w-full"
            onClick={handleLogin}
            data-testid="submit"
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
