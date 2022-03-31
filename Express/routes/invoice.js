const express = require("express");

const { validatorInvoice } = require("../middlewares/validatorInvoice");

const {
  getAllInvoice,
  getInvoiceId,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllInvoiceDate,
} = require("../controllers/invoice");

const router = express.Router();

router.get("/", getAllInvoice);
router.get("/:id", getInvoiceId);
router.get("/date/:date", getAllInvoiceDate);
router.put("/:id", updateInvoice);
router.post("/", validatorInvoice, createInvoice);
router.delete("/:id", deleteInvoice);

module.exports = router;
