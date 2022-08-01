import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    ItemName: "",
    BuyPrice: "",
    Quantity: "",
    SellPrice: "",
    Tax: "",
    Profit: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedFlip = {
    ItemName: form.ItemName,
    BuyPrice: form.BuyPrice,
    Quantity: form.Quantity,
    SellPrice: form.SellPrice,
    Tax: form.Tax,
    Profit: form.Profit,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedFlip),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="ItemName">Item name: </label>
          <input
            type="text"
            className="form-control"
            id="ItemName"
            value={form.ItemName}
            onChange={(e) => updateForm({ ItemName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="BuyPrice">Buy price: </label>
          <input
            type="number"
            className="form-control"
            id="BuyPrice"
            value={form.BuyPrice}
            onChange={(e) => updateForm({ BuyPrice: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Quantity">Quantity: </label>
          <input
            type="number"
            className="form-control"
            id="Quantity"
            value={form.Quantity}
            onChange={(e) => updateForm({ Quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="SellPrice">Sell price: </label>
          <input
            type="number"
            className="form-control"
            id="SellPrice"
            value={form.SellPrice}
            onChange={(e) => updateForm({ SellPrice: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Tax">Tax: </label>
          <input
            type="number"
            className="form-control"
            id="Tax"
            value={form.Tax}
            onChange={(e) => updateForm({ Tax: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Profit">Profit: </label>
          <input
            type="number"
            className="form-control"
            id="Profit"
            value={form.Profit}
            onChange={(e) => updateForm({ Profit: e.target.value })}
          />
        </div>        
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Flip"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
