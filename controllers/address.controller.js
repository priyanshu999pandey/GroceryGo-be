import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "user ID not found",
        success: false,
        error: true,
      });
    }

    const { address, city, state, pincode, mobile, country } = req.body;

    if (!address || !city || !state || !pincode || !mobile || !country) {
      return res.status(400).json({
        message: "All fields required",
        success: false,
        error: true,
      });
    }

    const addAddress = await AddressModel.create({
      address_line: address,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
    });

    const addAddressToUser = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: addAddress._id,
      },
    });

    return res.status(201).json({
      message: "Address added successfully",
      success: true,
      error: false,
      data: addAddress,
    });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const fetchAddress = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "user ID not found",
        success: false,
        error: true,
      });
    }

    const address = await AddressModel.find({ userId: userId }).populate();

    if (!address) {
      return res.status(400).json({
        message: "No address found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Address found Successfully",
      success: true,
      error: false,
      data: address,
    });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const UpdateAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const { address, city, state, pincode, mobile, country, _id } = req.body;

    const updateAddress = await AddressModel.findOneAndUpdate(
      { _id: _id, userId },
      {
        address_line: address,
        city,
        state,
        pincode,
        country,
        mobile,
      }
    );

    if (!updateAddress) {
      return res.status(400).json({
        message: "Adress not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Address updated successfully",
      success: true,
      error: false,
      data: updateAddress,
    });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "user ID not found",
        success: false,
        error: true,
      });
    }

    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({
        message: "AddressId Not found",
        success: false,
        error: true,
      });
    }

    const isAddressPresent = await AddressModel.findOne({
      _id: addressId,
      userId,
    });

    if (!isAddressPresent) {
      return res.status(400).json({
        message: "Address Not found",
        success: false,
        error: true,
      });
    }

    const deleteAddressFromUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          address_details: addressId,
        },
      },
      { new: true }
    );

    const deleteAddress = await AddressModel.deleteOne({
      _id: addressId,
      userId,
    });

    return res.status(200).json({
      message: "Address removed successfully",
      success: true,
      error: false,
      data: deleteAddress,
    });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
