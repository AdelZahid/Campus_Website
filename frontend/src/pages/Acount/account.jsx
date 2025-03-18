import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    coverPhoto: "",
    tagline: "",
    university: "",
    location: "",
    fields: [],
    about: "",
    interests: [],
    education: [],
    courses: [],
    achievements: [],
    projects: [],
    clubs: [],
    events: [],
  });
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    period: "",
    description: "",
  });
  const [newCourse, setNewCourse] = useState({
    code: "",
    title: "",
    institution: "",
    period: "",
    grade: "",
    certificate: false,
  });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    organization: "",
    date: "",
    description: "",
  });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    date: "",
    image: null,
  });
  const [newClub, setNewClub] = useState({
    name: "",
    role: "",
    period: "",
    description: "",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    month: "",
    day: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({
        ...prev,
        [field]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddItem = (field, newItem, setNewItem) => {
    setUser((prev) => ({
      ...prev,
      [field]: [...prev[field], { ...newItem, id: Date.now() }],
    }));
    setNewItem(
      field === "projects"
        ? { title: "", description: "", tags: "", date: "", image: null }
        : { ...newItem, id: "", title: "", description: "" }
    );
  };

  const renderFormSection = (title, fields, newItem, setNewItem) => (
    <section className="account-section">
      <h2 className="section-title">{title}</h2>
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={
                newItem ? newItem[field.name] || "" : user[field.name] || ""
              }
              onChange={
                newItem
                  ? (e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                  : handleInputChange
              }
              className="form-input"
            />
          ) : field.type === "file" ? (
            <input
              type="file"
              onChange={(e) =>
                newItem
                  ? setNewItem((prev) => ({
                      ...prev,
                      [field.name]: e.target.files[0],
                    }))
                  : handleFileChange(e, field.name)
              }
              className="form-input file-input"
            />
          ) : (
            <input
              type={field.type || "text"}
              name={field.name}
              value={
                newItem
                  ? newItem[field.name] || ""
                  : field.name.includes("fields") ||
                    field.name.includes("interests")
                  ? (user[field.name] || []).join(", ")
                  : user[field.name] || ""
              }
              onChange={
                newItem
                  ? (e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                  : (e) =>
                      field.name.includes("fields") ||
                      field.name.includes("interests")
                        ? handleArrayChange(field.name, e.target.value)
                        : handleInputChange(e)
              }
              className="form-input"
            />
          )}
        </div>
      ))}
    </section>
  );

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Account Settings"
            className="header-image"
          />
          <h1>Account Settings</h1>
        </div>
        <div className="account-tabs">
          {[
            "personal",
            "education",
            "achievements",
            "projects",
            "activities",
          ].map((tab) => (
            <button
              key={tab}
              className={`account-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="account-content">
          {activeTab === "personal" && (
            <>
              {renderFormSection("Personal Information", [
                { label: "Name", name: "name" },
                { label: "Avatar", name: "avatar", type: "file" },
                { label: "Cover Photo", name: "coverPhoto", type: "file" },
                { label: "Tagline", name: "tagline" },
                { label: "University", name: "university" },
                { label: "Location", name: "location" },
                { label: "Fields (comma-separated)", name: "fields" },
                { label: "About", name: "about", type: "textarea" },
                { label: "Interests (comma-separated)", name: "interests" },
              ])}
            </>
          )}

          {activeTab === "education" && (
            <>
              {renderFormSection(
                "Add Education",
                [
                  { label: "Institution", name: "institution" },
                  { label: "Degree", name: "degree" },
                  { label: "Period", name: "period" },
                  {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                  },
                ],
                newEducation,
                setNewEducation
              )}
              <button
                className="add-btn"
                onClick={() =>
                  handleAddItem("education", newEducation, setNewEducation)
                }
              >
                Add Education
              </button>
              <div className="items-list">
                {user.education.map((item) => (
                  <div key={item.id} className="item-card">
                    <p>
                      <strong>{item.institution}</strong> - {item.degree}
                    </p>
                    <p>{item.period}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              {renderFormSection(
                "Add Course",
                [
                  { label: "Code", name: "code" },
                  { label: "Title", name: "title" },
                  { label: "Institution", name: "institution" },
                  { label: "Period", name: "period" },
                  { label: "Grade", name: "grade" },
                  { label: "Certificate (true/false)", name: "certificate" },
                ],
                newCourse,
                setNewCourse
              )}
              <button
                className="add-btn"
                onClick={() =>
                  handleAddItem("courses", newCourse, setNewCourse)
                }
              >
                Add Course
              </button>
              <div className="items-list">
                {user.courses.map((item) => (
                  <div key={item.id} className="item-card">
                    <p>
                      <strong>{item.code}</strong> - {item.title}
                    </p>
                    <p>{item.institution}</p>
                    <p>{item.period}</p>
                    {item.grade && <p>Grade: {item.grade}</p>}
                    {item.certificate && <p>Certificate: Yes</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "achievements" && (
            <>
              {renderFormSection(
                "Add Achievement",
                [
                  { label: "Title", name: "title" },
                  { label: "Organization", name: "organization" },
                  { label: "Date", name: "date" },
                  {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                  },
                ],
                newAchievement,
                setNewAchievement
              )}
              <button
                className="add-btn"
                onClick={() =>
                  handleAddItem(
                    "achievements",
                    newAchievement,
                    setNewAchievement
                  )
                }
              >
                Add Achievement
              </button>
              <div className="items-list">
                {user.achievements.map((item) => (
                  <div key={item.id} className="item-card">
                    <p>
                      <strong>{item.title}</strong> - {item.organization}
                    </p>
                    <p>{item.date}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "projects" && (
            <>
              {renderFormSection(
                "Add Project",
                [
                  { label: "Title", name: "title" },
                  {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                  },
                  { label: "Tags (comma-separated)", name: "tags" },
                  { label: "Date", name: "date" },
                  { label: "Image", name: "image", type: "file" },
                ],
                newProject,
                setNewProject
              )}
              <button
                className="add-btn"
                onClick={() =>
                  handleAddItem(
                    "projects",
                    {
                      ...newProject,
                      tags: newProject.tags.split(",").map((tag) => tag.trim()),
                    },
                    setNewProject
                  )
                }
              >
                Add Project
              </button>
              <div className="items-list">
                {user.projects.map((item) => (
                  <div key={item.id} className="item-card">
                    <p>
                      <strong>{item.title}</strong>
                    </p>
                    <p>{item.description}</p>
                    <p>Tags: {item.tags.join(", ")}</p>
                    <p>{item.date}</p>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="item-image"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "activities" && (
            <>
              {renderFormSection(
                "Add Club",
                [
                  { label: "Name", name: "name" },
                  { label: "Role", name: "role" },
                  { label: "Period", name: "period" },
                  {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                  },
                ],
                newClub,
                setNewClub
              )}
              <button
                className="add-btn"
                onClick={() => handleAddItem("clubs", newClub, setNewClub)}
              >
                Add Club
              </button>
              <div className="items-list">
                {user.clubs.map((item) => (
                  <div key={item.id} className="item-card">
                    <p>
                      <strong>{item.name}</strong> - {item.role}
                    </p>
                    <p>{item.period}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              {renderFormSection(
                "Add Event",
                [
                  { label: "Title", name: "title" },
                  { label: "Date (YYYY-MM-DD)", name: "date" },
                  { label: "Month (e.g., Nov)", name: "month" },
                  { label: "Day (e.g., 15)", name: "day" },
                  { label: "Location", name: "location" },
                  {
                    label: "Description",
                    name: "description",
                    type: "textarea",
                  },
                ],
                newEvent,
                setNewEvent
              )}
              <button
                className="add-btn"
                onClick={() => handleAddItem("events", newEvent, setNewEvent)}
              >
                Add Event
              </button>
              <div className="items-list">
                {user.events.map((item) => (
                  <div key={item.id} className="item-card">
                    <p>
                      <strong>{item.title}</strong>
                    </p>
                    <p>
                      {item.date} ({item.month} {item.day})
                    </p>
                    <p>{item.location}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="account-actions">
            <button className="save-btn" onClick={handleSaveProfile}>
              Save Changes
            </button>
            <button className="cancel-btn" onClick={() => navigate("/profile")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
