import React from "react";

const Notifications = () => {
  return (
    <div className="tab-pane fade" id="account-notifications">
      <div className="card-body pb-2">
        <h6 className="mb-4">Activity</h6>
        <div className="form-group">
          <label className="switcher">
            <input type="checkbox" className="switcher-input" defaultChecked />
            <span className="switcher-indicator">
              <span className="switcher-yes"></span>
              <span className="switcher-no"></span>
            </span>
            <span className="switcher-label">
              Email me when someone comments on my article
            </span>
          </label>
        </div>
        <div className="form-group">
          <label className="switcher">
            <input type="checkbox" className="switcher-input" defaultChecked />
            <span className="switcher-indicator">
              <span className="switcher-yes"></span>
              <span className="switcher-no"></span>
            </span>
            <span className="switcher-label">
              Email me when someone answers on my forum thread
            </span>
          </label>
        </div>
        <div className="form-group">
          <label className="switcher">
            <input type="checkbox" className="switcher-input" />
            <span className="switcher-indicator">
              <span className="switcher-yes"></span>
              <span className="switcher-no"></span>
            </span>
            <span className="switcher-label">
              Email me when someone follows me
            </span>
          </label>
        </div>
      </div>
      <hr className="border-light m-0" />
      <div className="card-body pb-2">
        <h6 className="mb-4">Application</h6>
        <div className="form-group">
          <label className="switcher">
            <input type="checkbox" className="switcher-input" defaultChecked />
            <span className="switcher-indicator">
              <span className="switcher-yes"></span>
              <span className="switcher-no"></span>
            </span>
            <span className="switcher-label">News and announcements</span>
          </label>
        </div>
        <div className="form-group">
          <label className="switcher">
            <input type="checkbox" className="switcher-input" />
            <span className="switcher-indicator">
              <span className="switcher-yes"></span>
              <span className="switcher-no"></span>
            </span>
            <span className="switcher-label">Weekly product updates</span>
          </label>
        </div>
        <div className="form-group">
          <label className="switcher">
            <input type="checkbox" className="switcher-input" defaultChecked />
            <span className="switcher-indicator">
              <span className="switcher-yes"></span>
              <span className="switcher-no"></span>
            </span>
            <span className="switcher-label">Weekly blog digest</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
