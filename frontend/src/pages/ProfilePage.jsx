import React from "react";
import "../css/ProfilePage.css";

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    bio: "Computer Science Student | Tech Enthusiast | Avid Reader",
    profilePicture: "https://via.placeholder.com/150", // Replace with actual image URL
    campus: "XYZ University",
    email: "john.doe@xyz.edu",
    joined: "September 2021",
    followers: 1200,
    following: 350,
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-bio">{user.bio}</p>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Campus</span>
          <span className="detail-value">{user.campus}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Joined</span>
          <span className="detail-value">{user.joined}</span>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="action-button follow-button">Follow</button>
        <button className="action-button message-button">Message</button>
      </div>
    </div>
  );
};

export default ProfilePage;
