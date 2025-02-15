import React, { useState } from "react";

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState({
    twitter: "https://twitter.com/user",
    facebook: "https://www.facebook.com/user",
    googlePlus: "",
    linkedIn: "",
    instagram: "https://www.instagram.com/user",
  });

  const handleInputChange = (field, value) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [field]: value,
    }));
  };

  return (
    <div className="tab-pane fade" id="account-social-links">
      <div className="card-body pb-2">
        <div className="form-group">
          <label className="form-label">Twitter</label>
          <input
            type="text"
            className="form-control"
            value={socialLinks.twitter}
            onChange={(e) => handleInputChange("twitter", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Facebook</label>
          <input
            type="text"
            className="form-control"
            value={socialLinks.facebook}
            onChange={(e) => handleInputChange("facebook", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Google+</label>
          <input
            type="text"
            className="form-control"
            value={socialLinks.googlePlus}
            onChange={(e) => handleInputChange("googlePlus", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input
            type="text"
            className="form-control"
            value={socialLinks.linkedIn}
            onChange={(e) => handleInputChange("linkedIn", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Instagram</label>
          <input
            type="text"
            className="form-control"
            value={socialLinks.instagram}
            onChange={(e) => handleInputChange("instagram", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
