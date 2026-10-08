const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
  type: String,
  required: [true, 'Name is required'],
  trim: true,
  minlength: [3, 'Name must be at least 3 characters long'],
  maxlength: [50, 'Name cannot exceed 50 characters'],
  match: [/^[a-zA-Z\s\-]+$/, 'Name can only contain letters, spaces, and hyphens'],
},

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
    password: {
  type: String,
  required: [true, 'Password is required'],
  minlength: [6, 'Password must be at least 6 digits long'],
  maxlength: [20, 'Password must not exceed 20 digits'],
  match: [/^\d+$/, 'Password must contain digits only'],
},


    role: {
      type: String,
      enum: {
        values: ['Admin', 'Super Admin'],
        message: '{VALUE} is not a valid role',
      },
      required: [true, 'User role is required'],
    },
  },
  { timestamps: true}
);

module.exports = mongoose.model("users", UsersSchema);



