import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

const AddProjectPage = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    tags: "",
    date: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProject((prevProject) => ({
      ...prevProject,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("tags", project.tags);
    formData.append("date", project.date);
    if (project.image) {
      formData.append("image", project.image);
    }

    try {
      const response = await fetch("/api/user/add-project", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        alert("Project added successfully!");
        navigate("/account");
      } else {
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "80px" }}>
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={project.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={project.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              name="tags"
              value={project.tags}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="text"
              className="form-control"
              name="date"
              value={project.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="d-flex mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div className="flex-grow-1 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/account")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProjectPage;
