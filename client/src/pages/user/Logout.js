import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Perform logout request
        const response = await fetch('http://localhost:5000/auth/logout', {
          method: 'POST',
          credentials: 'include', // Include cookies for session management
        });

        const data = await response.json();

        if (response.ok) {
          // Clear local storage
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('role') 
          // Redirect to home page
          window.location.href = '/';
        } else {
          console.error('Logout failed:', data.message);
          // Optionally, display an error message to the user
        }
      } catch (error) {
        console.error('Error during logout:', error);
        // Optionally, display an error message to the user
      }
    };

    logoutUser();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
