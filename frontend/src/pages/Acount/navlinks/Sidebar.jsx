import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const tabs = [
    { id: "general", title: "General" },
    { id: "change-password", title: "Change Password" },
    { id: "info", title: "Info" },
    { id: "social-links", title: "Social Links" },
    { id: "connections", title: "Connections" },
    { id: "notifications", title: "Notifications" },
  ];

  return (
    <div className="col-md-3 pt-0">
      <div className="list-group list-group-flush account-settings-links">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={`/account/${tab.id}`}
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
            {tab.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
