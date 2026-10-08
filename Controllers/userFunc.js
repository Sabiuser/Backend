const userInfo = require('../models/UsersSchema');

const getUser = async (req, res) => {
  try {
    const userData = await userInfo.find({}).lean();
    return res.status(200).json({
      message: "User fetched successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const postUser = async (req, res) => {
  try {
    const newOrder = await userInfo.create(req.body);
    return res.status(200).json({
      message: "User created successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const putUser = async (req, res) => {
  try {
    const updateData = req.body;
    const { userId } = updateData;

    if (!userId) {
      return res.status(400).json({
        message: "UserID is required",
        data: null,
      });
    }

    const updatedOrder = await userInfo.updateOne(
      { userId },
      { $set: updateData },
      
    );

    if (!userId) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
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
const deleteUser = async (req, res) =>
  {
    try {
      const { userId } = req.body;
      const deletedOrder = await userInfo.deleteOne({ userId });
      if (!deletedOrder) {
        return res.status(404).json({
          message: "userInfo not found",
          data: null,
          });
          }
          return res.status(200).json({
            message: "User deleted successfully",
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
getUser,
postUser,
putUser,
deleteUser
  
};



