import { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PageNotFound = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.value);

  useEffect(() => {
    // Check if the user is not logged in
    if (!currentUser || currentUser.length === 0) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card className="text-center">
        <h1 className="mb-3">404 - Page Not Found</h1>
        <p className="mb-3">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Button label="Go Home" icon="pi pi-home" onClick={handleGoHome} />
      </Card>
    </div>
  );
};
