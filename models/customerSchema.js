const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: [true, 'Customer ID is required'],
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
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  
});

module.exports = mongoose.model('Customer', CustomerSchema);
