import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [currPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getInvoices();
  }, []);

  const currentSlideInvoice = invoices.slice((currPage - 1) * 8, currPage * 8);

  const totalPage = Math.max(1, Math.ceil(invoices.length / 8));

  const getInvoices = async () => {
    try {
      const apiUrl = "https://delhi-digits-1.onrender.com/invoices";
      const jwtToken = Cookies.get("jwtToken");

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        setInvoices(response.data.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const increasePage = () => {
    if (currPage < totalPage) {
      setCurrentPage(currPage + 1);
    }
  };

  const decreasePage = () => {
    if (currPage > 1) {
      setCurrentPage(currPage - 1);
    }
  };

  console.log(invoices);

  return (
    <div className="main">
      <div className="header">
        <h1>Invoice Management</h1>
        <button>Logout</button>
      </div>
      <div>
        <div className="invoice-add-button-cnatiner">
          <h2>Invoices Overview</h2>
          <button>Add Invoice</button>
        </div>
        {currentSlideInvoice.length > 0 && (
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentSlideInvoice.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.clientName}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="page-buttons">
        <button onClick={decreasePage} disabled={currPage === 1}>
          Prev
        </button>
        {currPage} / {totalPage}
        <button onClick={increasePage} disabled={currPage === totalPage}>
          Next
        </button>
      </div>
      <form className="form-container">
        <h2>Add New Invoice</h2>
        <label for="client-name">Client Name:</label>
        <input type="text" id="client-name" name="client_name" required />

        <label for="amount">Amount :</label>
        <input type="number" id="amount" name="amount" required />

        <label for="status">Status:</label>
        <select id="status" name="status">
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <div className="button-container">
          <button className="add-button">Adsd</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
