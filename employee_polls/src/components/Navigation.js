import { useEffect } from "react"; // Import useEffect here
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../reducers/currentUserSlice";
import logo from "./../logo.svg";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get location for checking the current path

  // Retrieve user data from session storage
  const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const userData = storedUser ? storedUser : []; // If not found, set to empty array

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('currentUser'); // Clear session storage on logout
    navigate("/");
  };

  const menuItems = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/home") },
    {
      label: "Leaderboard",
      icon: "pi pi-chart-bar",
      command: () => navigate("/leaderboard"),
    },
    {
      label: "New Poll",
      icon: "pi pi-plus-circle",
      command: () => navigate("/add"),
    },
  ];

  const logoElement = (
    <img alt="App Logo" src={logo} height="40" className="mr-2" />
  );

  const userElement = (
    <div className="flex align-items-center">
      {userData[1]?.avatarURL && (
        <img
          src={userData[1].avatarURL}
          alt="User Avatar"
          height="40"
          className="mr-2 border-circle"
        />
      )}
      <span className="mr-4">{userData[0]}</span>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        text
        onClick={handleLogout}
      />
    </div>
  );

  // Redirect to home if user is already logged in and tries to access login page
  useEffect(() => {
    const checkLoginRedirect = () => {
      if (userData.length > 0 && location.pathname === "/") {
        navigate("/home", { replace: true });
      }
    };
    checkLoginRedirect();
  }, [userData, navigate, location.pathname]);

  return (
    <div className="card">
      <Menubar model={menuItems} start={logoElement} end={userElement} />
    </div>
  );
};

export default Navigation;
