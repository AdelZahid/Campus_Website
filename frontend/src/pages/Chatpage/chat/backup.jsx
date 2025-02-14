import React, { useState } from "react";
import "./account.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from "react-router-dom";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", title: "General" },
    { id: "change-password", title: "Change password" },
    { id: "info", title: "Info" },
    { id: "social-links", title: "Social links" },
    { id: "connections", title: "Connections" },
    { id: "notifications", title: "Notifications" },
  ];

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`list-group-item list-group-item-action ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              {/* General Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "general" ? "active show" : ""
                }`}
                id="account-general"
              >
                <div className="card-body media align-items-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                    className="d-block ui-w-80"
                  />
                  <div className="media-body ml-4">
                    <label className="btn btn-outline-primary">
                      Upload new photo
                      <input
                        type="file"
                        className="account-settings-fileinput"
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-default md-btn-flat"
                    >
                      Reset
                    </button>
                    <div className="text-light small mt-1">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </div>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      value="nmaxwell"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Nelle Maxwell"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      value="nmaxwell@mail.com"
                    />
                    <div className="alert alert-warning mt-3">
                      Your email is not confirmed. Please check your inbox.
                      <br />
                      <a href="#!">Resend confirmation</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Company Ltd."
                    />
                  </div>
                  <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                    <button type="button" className="btn btn-default ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Change Password Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "change-password" ? "active show" : ""
                }`}
                id="account-change-password"
              >
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Current password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Repeat new password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                    <button type="button" className="btn btn-default ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "info" ? "active show" : ""
                }`}
                id="account-info"
              >
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea className="form-control" rows="5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Birthday</label>
                    <input
                      type="text"
                      className="form-control"
                      value="May 3, 1995"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select className="custom-select">
                      <option>USA</option>
                      <option>Canada</option>
                      <option>UK</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body pb-2">
                  <h6 className="mb-4">Contacts</h6>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value="+0 (123) 456 7891"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input type="text" className="form-control" value="" />
                  </div>
                  <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                    <button type="button" className="btn btn-default ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Links Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "social-links" ? "active show" : ""
                }`}
                id="account-social-links"
              >
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Twitter</label>
                    <input
                      type="text"
                      className="form-control"
                      value="https://twitter.com/user"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      value="https://www.facebook.com/user"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Google+</label>
                    <input type="text" className="form-control" value="" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input type="text" className="form-control" value="" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      value="https://www.instagram.com/user"
                    />
                  </div>
                  <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                    <button type="button" className="btn btn-default ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Connections Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "connections" ? "active show" : ""
                }`}
                id="account-connections"
              >
                <div className="card-body">
                  <button type="button" className="btn btn-twitter">
                    Connect to <strong>Twitter</strong>
                  </button>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <h5 className="mb-2">
                    <a href="#!" className="float-right text-muted text-tiny">
                      <i className="ion ion-md-close"></i> Remove
                    </a>
                    <i className="ion ion-logo-google text-google"></i>
                    You are connected to Google:
                  </h5>
                  <a
                    href="/cdn-cgi/l/email-protection"
                    className="__cf_email__"
                    data-cfemail="f9979498818e9c9595b994989095d79a9694"
                  >
                    [email&#160;protected]
                  </a>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <button type="button" className="btn btn-facebook">
                    Connect to <strong>Facebook</strong>
                  </button>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <button type="button" className="btn btn-instagram">
                    Connect to <strong>Instagram</strong>
                  </button>
                </div>
                <div className="text-right mt-3">
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                  <button type="button" className="btn btn-default ml-2">
                    Cancel
                  </button>
                </div>
              </div>

              {/* Notifications Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "notifications" ? "active show" : ""
                }`}
                id="account-notifications"
              >
                <div className="card-body pb-2">
                  <h6 className="mb-4">Activity</h6>
                  <div className="form-group">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
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
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
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
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
                      <span className="switcher-indicator">
                        <span className="switcher-yes"></span>
                        <span className="switcher-no"></span>
                      </span>
                      <span className="switcher-label">
                        News and announcements
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
                        Weekly product updates
                      </span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        defaultChecked
                      />
                      <span className="switcher-indicator">
                        <span className="switcher-yes"></span>
                        <span className="switcher-no"></span>
                      </span>
                      <span className="switcher-label">Weekly blog digest</span>
                    </label>
                  </div>
                  <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                    <button type="button" className="btn btn-default ml-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
