import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './assets/styles.css';

const Record = (props) => (
  <tr>
    <td>{props.record.ItemName}</td>
    <td>ㅤㅤ{props.record.BuyPrice}</td>
    <td>ㅤㅤ{props.record.Quantity}</td>
    <td>ㅤㅤㅤ{props.record.SellPrice}</td>
    <td>ㅤ{props.record.Tax}</td>
    <td>ㅤㅤㅤㅤㅤㅤㅤ{props.record.IncleTax}</td>
    <td>ㅤㅤ{props.record.Profit}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
//get props.record.Profit from the database and sums all the profits, if sum is < 0 id="earnings" style.color="green" else id="losses" style.color="red"
  function sumProfit() {
    let sum = 0;
    for (let i = 0; i < records.length; i++) {
      sum += records[i].Profit;
    }
    if (sum === 0) {
      return <h3 id="even" style={{ color: "gold", margin: "auto", textAlign: "center"}}>{sum + ""}</h3>;
    } else if (sum > 0) {
      return <h3 id="earnings" style={{ color: "green", margin: "auto", textAlign: "center"}}>{sum + " ↑"}</h3>;
    } else {
        return <h3 id="losses" style={{ color: "red", margin: "auto", textAlign: "center"}}>{sum + " ↓"}</h3>;
    }
  }



  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div style={{ "clear": "both"}}>
      <h2 style={{"float": "left", marginTop: "1.5%",marginLeft: "5%"  }}>Flip Log</h2>
      <h3 id="earnings" style={{"float": "right", marginBottom: "2%", marginTop: "1%",marginRight: "5%"    }}>Total Earnings: {sumProfit()}</h3>
      </div>
      <table className="table table-striped" style={{marginLeft: "-1%", width: "103%"}}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Buy Price</th>
            <th>Quantity</th>
            <th>Sell Price</th>
            <th>ㅤTax</th>
            <th>Profit (incl. Tax)</th>
            <th>Total Profit</th>
            <th>ㅤㅤㅤㅤActions</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
