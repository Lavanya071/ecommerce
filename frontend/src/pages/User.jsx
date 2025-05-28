import React, { useEffect, useState } from 'react';

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user'); // Retrieve user data from localStorage
      console.log('Retrieved user data:', userData); // Log the raw user data
      if (userData && userData !== 'undefined') {
        setUser(JSON.parse(userData)); // Only parse if data exists
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome to our website</h1>
          {/* Render other user information */}
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}

export default User;
