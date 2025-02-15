import React from "react";

const InfoTab = () => {
  return (
    <div className="tab-pane fade" id="account-info">
      <div className="card-body pb-2">
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-control" rows="5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Birthday</label>
          <input type="text" className="form-control" value="May 3, 1995" />
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <select className="custom-select">
            <option>USA</option>
            <option selected>Canada</option>
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
      </div>
    </div>
  );
};

export default InfoTab;
