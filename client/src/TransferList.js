import React from "react";

export default function TransferList({ transfers, approveTransfer }) {
  return (
    <div className="card border-success my-4">
      <div className="card-header">Transfers</div>
      <div className="card-body">
        <table className="table table-hover ">
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
              <tr
                style={{
                  verticalAlign: "baseline",
                }}
                key={transfer.id}
              >
                <th scope="row">{transfer.id}</th>
                <td>{transfer.amount}</td>
                <td>{transfer.to}</td>
                <td>{transfer.approvals}</td>
                <td>{transfer.sent ? "yes" : "no"}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    disabled={transfer.sent ? true : false}
                    onClick={() => {
                      approveTransfer(transfer.id);
                    }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
