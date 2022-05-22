import React from "react";

export default function Header({ approvers, quorum }) {
  return (
    <div className="card border-info my-4">
      <div className="card-header">Wallet Info</div>
      <div className="card-body">
        <ul>
          <li>
            <h4 className="card-title">Approvers</h4>
            <ul className="list-group">
              {approvers.map((approver) => (
                <li
                  key={approver}
                  className="list-group-item"
                >
                  {approver}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h4 className="card-title my-3">Quorum: {quorum}</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}
