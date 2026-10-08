const cust = require('../models/customerSchema')
const getCustomer = async (req, res) => {
  try {
    const customerData = await cust.find({}).lean();
    return res.status(200).json({
      message: "Customer list fetched successfully",
      data: customerData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const postCustomer = async (req, res) => {
  try {
    const newCustomer = await cust.create(req.body);
    return res.status(200).json({
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const putCustomer = async (req, res) => {
  try {
    const updateData = req.body;
    const { customerId } = updateData;

    if (!customerId) {
      return res.status(400).json({
        message: "customerId is required",
        data: null,
      });
    }

    const updatedOrder = await cust.updateOne(
      { customerId },
      { $set: updateData },
      
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Customer not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Customer updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
const deleteCustomer = async (req, res) =>
  {
    try {
      const { customerId } = req.body;
      const deletedOrder = await cust.deleteOne({ customerId });
      if (!deletedOrder) {
        return res.status(404).json({
          message: "Customer not found",
          data: null,
          });
          }
          return res.status(200).json({
            message: "Customer deleted successfully",
            data: deletedOrder,
            });
            } catch (error) {
              console.error("Delete error:", error);
              return res.status(500).json({
                message: error.message,
                data: null,
                });
                }
                };





module.exports = {
 getCustomer,
 postCustomer,
 putCustomer,
 deleteCustomer
  
  
};
