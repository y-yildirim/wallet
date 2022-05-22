import React, { useState } from "react";

export default function NewTransfer({ createTransfer }) {
  const [transfer, setTransfer] = useState([]);

  const updateTransfer = (e, field) => {
    const value = e.target.value;
    setTransfer({ ...transfer, [field]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    createTransfer(transfer);
  };

  return (
    <div className="card border-primary my-4">
      <div className="card-header">Create Transfer</div>
      <div className="card-body">
        <form className="form-group" onSubmit={(e) => submit(e)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Amount in Wei"
              onChange={(e) => updateTransfer(e, "amount")}
            />
            <label htmlFor="amount">Amount in Wei</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="to"
              placeholder="Recipent's Adress"
              onChange={(e) => updateTransfer(e, "to")}
            />
            <label htmlFor="to">Recipent's Adress</label>
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100 my-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
