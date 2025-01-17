const invoiceService = require("../services/invoiceService");

// Get All Invoice
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Get A Invoice By Id

const getInvoicesById = async (req, res) => {
  try {
    const invoice = await invoiceService.getInvoicesById(req.params.id);
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Post A Invoice By Id

const addInvoices = async (req, res) => {
  try {
    const invoice = await invoiceService.addInvoices(req.body);
    return res.status(201).json({
      success: true,
      message: "Invoice added successfully",
      data: invoice,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Update An  Invoice By Id

const updateInvoiceById = async (req, res) => {
  console.log("updating  started...");
  try {
    await invoiceService.updateInvoiceById(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Invoice Updated successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Delete An Invoice By Id

const deleteInvoiceById = async (req, res) => {
  try {
    await invoiceService.deleteInvoiceById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Invoice Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllInvoices,
  getInvoicesById,
  addInvoices,
  updateInvoiceById,
  deleteInvoiceById,
};
