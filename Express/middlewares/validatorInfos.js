const path = require("path");
const validator = require("validator");
const yup = require("yup");
const { invoice, info, product } = require("../models");

exports.validatorInfo = async (req, res, next) => {
  try {
    const errors = [];

    const schemaInfo = yup.object().shape({
      id_invoice: yup.number().min(1).required(),
      id_product: yup.number().min(1).required(),
    });

    const checkNoInvoice = await invoice.findOne({
      where: {
        id: req.body.id_invoice,
      },
    });
    const checkNoproduct = await product.findOne({
      where: {
        id: req.body.id_product,
      },
    });

    if (checkNoInvoice == null) {
      errors.push(" Invoice not found ");
    }
    if (checkNoproduct == null) {
      errors.push(" Product not found ");
    }

    await schemaInfo.validate(req.body, { abortEarly: false });

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: errors });
    }

    next();
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<,");
    res.status(404).json({ error: "validation failed", messages: error.inner });
  }
};
