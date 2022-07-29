import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    ItemName: "",
    BuyPrice: "",
    Quantity: "",
    SellPrice: "",
    Tax: "",
    Profit: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({    ItemName: "",
    BuyPrice: "",
    Quantity: "",
    SellPrice: "",
    Tax: "",
    Profit: "",});
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Enter your flip</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ ItemName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Buy Price</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ BuyPrice: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Quantity</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ Quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Sell Price</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ sellPrice: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Tax</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ Tax: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Profit</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ Profit: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Log flip"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
