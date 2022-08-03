import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    ItemName: "",
    BuyPrice: "",
    Quantity: "",
    SellPrice: "",
    Tax: "",
    IncleTax: "",
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
    const newFlip = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFlip),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ItemName: "", BuyPrice: "", Quantity: "", SellPrice: "", Tax: "",IncleTax: "", Profit: ""});
    navigate("/");
  }
  //function that calculates the profit including tax

  function Calc() {

    var tax = document.getElementById("tax");
    var taxRounded = Math.round(form.SellPrice * 0.01);
    tax.innerHTML = "Tax: -" + taxRounded;
    form.Tax ="-" +  Math.round(form.SellPrice * 0.01);

    var pwTax = document.getElementById("IncleTax");
    var pwTaxRounded = Math.round(form.SellPrice - form.BuyPrice + parseInt(form.Tax));
    form.IncleTax = Math.round(form.SellPrice - form.BuyPrice + parseInt(form.Tax));
    pwTax.innerHTML = "Profit (incl. Tax): " + pwTaxRounded;

    var profit = document.getElementById("profit");
    var profitRounded = Math.round(pwTaxRounded * form.Quantity);
    profit.innerHTML = "Total Profit: " + profitRounded;
    form.Profit = profitRounded;

  }
  // This following section will display the form that takes the input from the user.
  return (
    <div style={{"width" : "35%", "margin": "auto"}}>
      <h3 style={{"margin-left": "20%"}}>Enter your flip</h3><br></br>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="ItemName">Item Name</label>
          <input
            type="text"
            className="form-control ItemName"
            id="ItemName"
            value={form.ItemName}
            onChange={(e) => updateForm({ ItemName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="BuyPrice">Buy Price(gp)</label>
          <input
            type="number"
            className="form-control BuyPrice"
            id="BuyPrice"
            value={form.BuyPrice}
            onChange={(e) => updateForm({ BuyPrice: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Quantity">Quantity</label>
          <input
            type="number"
            className="form-control Quantity"
            id="Quantity"
            value={form.Quantity}
            onChange={(e) => updateForm({ Quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="SellPrice">Sell Price(gp)</label>
          <input
            type="number"
            className="form-control SellPrice"
            id="SellPrice"
            value={form.SellPrice}
            onKeyUp={Calc}
            onChange={(e) => updateForm({ SellPrice: e.target.value })}
          />
        </div>
        <div class="flex-containerCalcs">
          <div class="flex-itemsCalcs">
            <text id="tax">Tax: </text>
          </div>
          <div class="flex-itemsCalcs"><br></br>
            <text id="IncleTax">Profit (incl. Tax): </text>
          </div>
          <div class="flex-itemsCalcs"><br></br>
            <text id="profit">Total Profit: </text>
          </div>
        </div>
        <div className="form-group"><br></br>
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
