import React from "react";

export default function Header({ approvers, quorum }) {
  return (
    <div class="card border-primary mt-4">
      <div class="card-header">Wallet Info</div>
      <div class="card-body">
        <ul>
          <li>
            <h4 class="card-title">Approvers</h4>
            <ol class="list-group">
              {approvers.map((approver) => (
                <li
                  key={approver}
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {approver}
                </li>
              ))}
            </ol>
          </li>
          <li>
            <h4 class="card-title">Quorum</h4>
            {quorum}
          </li>
        </ul>
      </div>
    </div>
  );
}
