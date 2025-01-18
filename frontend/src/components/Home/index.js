import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [currPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [invoiceName, setInvoiceName] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [editForm, setEditForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getInvoices();
  }, [invoices]);

  const currentSlideInvoice = invoices.slice((currPage - 1) * 8, currPage * 8);

  const totalPage = Math.max(1, Math.ceil(invoices.length / 8));

  const getInvoices = async () => {
    if (Cookies.get("jwtToken") === undefined) {
      navigate("/login");
    }

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

  const onClickAddInvoice = () => {
    setIsOpen(true);
  };

  const onClickClose = () => {
    setIsOpen(false);
  };

  const onClickInvoice = (invoice) => {
    console.log(invoice);
    setInvoiceName(invoice.clientName);
    setInvoiceAmount(invoice.amount);
    setInvoiceStatus(invoice.status);
    setInvoiceNumber(invoice.invoiceNumber);
    setInvoiceId(invoice._id);
    setEditForm(true);
  };

  const onSubmitNewInvoiceForm = async (e) => {
    setIsOpen(false);
    e.preventDefault();

    try {
      const apiUrl = "https://delhi-digits-1.onrender.com/invoices";
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.post(
        apiUrl,
        { clientName: name, amount, status },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        alert("Invoice Added Successful");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setAmount("");
      setName("");
      setStatus("");
      alert(error.response.data.message);
    }
  };

  const onClickModify = async () => {
    setEditForm(false);
    try {
      const apiUrl = `https://delhi-digits-1.onrender.com/invoices/${invoiceId}`;
      console.log(apiUrl);
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.put(
        apiUrl,
        {
          clientName: invoiceName,
          status: invoiceStatus,
          amount: invoiceAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Invoice Deleted Successfully");
      }
    } catch (error) {
      console.log(error.response.data.message);

      alert(error.response.data.message);
    }
  };
  const onClickDelete = async () => {
    setEditForm(false);
    try {
      const apiUrl = `https://delhi-digits-1.onrender.com/invoices/${invoiceId}`;
      console.log(apiUrl);
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.status === 200) {
        alert("Invoice Deleted Successfully");
      }
    } catch (error) {
      console.log(error.response.data.message);

      alert(error.response.data.message);
    }
  };

  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="header">
        <h1>Invoice Management</h1>
        <button onClick={onClickLogout}>Logout</button>
      </div>
      {!isOpen && !editForm && (
        <>
          <div>
            <div className="invoice-add-button-cnatiner">
              <h2>Invoices Overview</h2>
              <button onClick={onClickAddInvoice}>Add Invoice</button>
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
                    <tr key={index} onClick={(e) => onClickInvoice(invoice)}>
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
        </>
      )}
      {isOpen && (
        <form className="form-container" onSubmit={onSubmitNewInvoiceForm}>
          <h2>Add New Invoice</h2>
          <label for="client-name">Client Name:</label>
          <input
            type="text"
            id="client-name"
            name="client_name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label for="amount">Amount :</label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label for="status">Status:</label>
          <select
            id="status"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <div className="button-container">
            <button className="add-button" type="submit">
              Add
            </button>
            <button className="cancel-button" onClick={onClickClose}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {editForm && (
        <div className="form-container">
          <h2>Invoice Details</h2>
          <label for="client-name">Invoice Number:</label>
          <h6>{invoiceNumber}</h6>
          <label for="client-name">Client Name:</label>
          <input
            type="text"
            id="client-name"
            name="client_name"
            onChange={(e) => setInvoiceName(e.target.value)}
            value={invoiceName}
            required
          />

          <label for="amount">Amount :</label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={(e) => setInvoiceAmount(e.target.value)}
            required
            value={invoiceAmount}
          />

          <label for="status">Status:</label>
          <select
            id="status"
            name="status"
            onChange={(e) => setInvoiceStatus(e.target.value)}
            value={invoiceStatus}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <div className="button-container">
            <button
              className="add-button"
              type="submit"
              onClick={onClickModify}
            >
              Modify
            </button>
            <button className="cancel-button" onClick={onClickDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
