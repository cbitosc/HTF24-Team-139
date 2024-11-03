// src/components/profile/ProfilePage.js
import React, { useState } from 'react';
import './ProfileStyles.css';
import Sidebar from '../layout/Sidebar';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
  });
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    alert('Profile information updated successfully!');
  };

  return (
    <>
    <Sidebar/>
    <div className={`profile-page ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Profile Settings</h1>

      <div className="profile-section profile-image-section">
        <h2>Profile Picture</h2>
        <div className="profile-image-container">
          <img src={profileImage || '/default-profile.png'} alt="Profile" />
          <input type="file" onChange={handleProfileImageChange} />
        </div>
      </div>

      <div className="profile-section">
        <h2>Personal Information</h2>
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={userInfo.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
      </div>

      <div className="profile-section">
        <h2>Change Password</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="New Password"
        />
      </div>

      <div className="profile-section">
        <h2>Notification Settings</h2>
        <label>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={notifications.emailNotifications}
            onChange={handleNotificationChange}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="smsNotifications"
            checked={notifications.smsNotifications}
            onChange={handleNotificationChange}
          />
          SMS Notifications
        </label>
      </div>

      <div className="profile-section">
        <h2>Security</h2>
        <label>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
          />
          Two-Factor Authentication
        </label>
      </div>

      <div className="profile-section">
        <h2>Appearance</h2>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </label>
      </div>

      <button className="save-button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
    
    </>
  );
}

export default ProfilePage;
