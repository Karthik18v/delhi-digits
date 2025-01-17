const Invoice = require("../model/invoice");
const { v4: uuidv4 } = require("uuid");

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "Karthik", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    return { invoices };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { success: false, error: error.message };
  }
};

// Add a new invoice
const addInvoices = async (reqBody) => {
  console.log("Request Body:", reqBody);
  try {
    const { clientName, amount, status } = reqBody;

    if (!clientName || !amount || !status) {
      return "All fields are required";
    }

    // Create invoice
    const invoice = new Invoice({
      invoiceNumber: uuidv4(),
      clientName,
      date: new Date(), // Ensures proper date storage
      amount,
      status,
    });

    await invoice.save();
    return {
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    };
  } catch (error) {
    console.error("Error adding invoice:", error);
    return error.message;
  }
};

const updateInvoiceById = async (id, updateData) => {
  console.log("Hello");
  try {
    await Invoice.findByIdAndUpdate(id, updateData, { new: true });
    return "Updates Successfully";
  } catch (error) {
    console.error("Error adding invoice:", error);
    return error.message;
  }
};

const deleteInvoiceById = async (id) => {
  try {
    await Invoice.findByIdAndDelete(id);
    return "Deleted Successfully";
  } catch (error) {
    console.error("Error adding invoice:", error);
    return error.message;
  }
};

const getInvoicesById = async (id) => {
  console.log(id);
  try {
    const invoices = await Invoice.findById(id);
    return { invoices };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  getAllInvoices,
  addInvoices,
  updateInvoiceById,
  deleteInvoiceById,
  getInvoicesById,
};
