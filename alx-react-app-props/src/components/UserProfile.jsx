// src/components/UserProfile.jsx
import React, { useContext } from 'react';
import UserContext from './UserContext'; // make sure the path is c

 function UserProfile() {
  // Consume user data from context
  const userData = useContext(UserContext);

  return (
    <div style={{ border: '1px solid gray', padding: '15px', margin: '15px', borderRadius: '8px', maxWidth: '300px' }}>
      <h2 style={{ color: 'blue', fontSize: '1.5em', marginBottom: '10px' }}>
        {userData.name}
      </h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{userData.age}</span></p>
      <p style={{ fontStyle: 'italic' }}>Bio: {userData.bio}</p>
    </div>
  )
  }
 export default UserProfile;