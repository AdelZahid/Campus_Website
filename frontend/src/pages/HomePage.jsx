import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <h1 className="text-center">Welcome to the University Portal</h1>
          <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for universities, clubs, jobs, etc."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}