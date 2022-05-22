import React from "react";

export default function TransferList({ transfers, approveTransfer }) {
  return (
    <div>
      <h2>Transfers</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Amount</th>
            <th scope="col">To</th>
            <th scope="col">Approvals</th>
            <th>Sent</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr className="table-primary" key={transfer.id}>
              <th scope="row">{transfer.id}</th>
              <td>{transfer.amount}</td>
              <td>{transfer.to}</td>
              <td>{transfer.approvals}</td>
              <td>{transfer.sent ? "yes" : "no"}</td>
              <td>
                {" "}
                <span
                  className="badge rounded-pill bg-success"
                  type="button"
                  onClick={() => {
                    approveTransfer(transfer.id);
                  }}
                >
                  Approve
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
