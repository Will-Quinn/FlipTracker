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
    IncleTax: form.IncleTax,
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
  function Calc() {

    var tax = document.getElementById("Tax");
    var taxRounded = Math.round(form.SellPrice * 0.01);
    tax.innerHTML = "Tax: -" + taxRounded;
    form.Tax ="-" +  Math.round(form.SellPrice * 0.01);

    var pwTax = document.getElementById("IncleTax");
    var pwTaxRounded = Math.round(form.SellPrice - form.BuyPrice + parseInt(form.Tax));
    form.IncleTax = Math.round(form.SellPrice - form.BuyPrice + parseInt(form.Tax));
    pwTax.innerHTML = "Profit (incl. Tax): " + pwTaxRounded;

    var profit = document.getElementById("Profit");
    var profitRounded = Math.round(pwTaxRounded * form.Quantity);
    profit.innerHTML = "Total Profit: " + profitRounded;
    form.Profit = profitRounded;

  }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div style={{"width" : "35%", "margin": "auto"}}>
      <h3 style={{"margin-left": "20%"}}>Update Record</h3>
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
            onKeyUp={Calc}            
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
            onKeyUp={Calc}
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
            onKeyUp={Calc}
            onChange={(e) => updateForm({ SellPrice: e.target.value })}
          />
        </div>
        <div class="flex-containerCalcs">
          <div class="flex-itemsCalcs">
            <text id="Tax">Tax: </text>
          </div>
          <div class="flex-itemsCalcs"><br></br>
            <text id="IncleTax">Profit (incl. Tax): </text>
          </div>
          <div class="flex-itemsCalcs"><br></br>
            <text id="Profit">Total Profit: </text>
          </div>
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
