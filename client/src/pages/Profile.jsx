import React, { useEffect, useState } from 'react';


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/user/profile');
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Score:</strong> {user.score}</p>
    </div>
  );
};

export default Profile;
