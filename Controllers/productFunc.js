const pro = require('../models/productSchema')
const getProduct = async (req, res) => {
  try {
    const productData = await pro.find({}).lean();
    return res.status(200).json({
      message: "Products list fetched successfully",
      data: productData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const postProduct = async (req, res) => {
  try {
    const newProduct = await pro.create(req.body);
    return res.status(200).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const putProduct = async (req, res) => {
  try {
    const updateData = req.body;
    const { productId } = updateData;

    if (!productId) {
      return res.status(400).json({
        message: "ProductId is required",
        data: null,
      });
    }

    const updatedOrder = await pro.updateOne(
      { productId },
      { $set: updateData },
      
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Product not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
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
const deleteProduct = async (req, res) =>
  {
    try {
      const { productId } = req.body;
      const deletedOrder = await pro.deleteOne({ productId });
      if (!deletedOrder) {
        return res.status(404).json({
          message: "Product not found",
          data: null,
          });
          }
          return res.status(200).json({
            message: "Product deleted successfully",
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
 getProduct,
 postProduct,
 putProduct,
 deleteProduct
  
  
};
