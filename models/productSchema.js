const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
  type: String,
  required: [true, 'Name is required'],
  trim: true,
  minlength: [3, 'Name must be at least 3 characters long'],
  maxlength: [50, 'Name cannot exceed 50 characters'],
  match: [/^[a-zA-Z\s\-]+$/, 'Name can only contain letters, spaces, and hyphens'],
},
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Electronics', 'Clothings', 'Books', 'Furniture'],
      message: '{VALUE} is not a valid category'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function (v) {
        return /^\d+(\.\d{1,2})?$/.test(v.toString());
      },
      message: 'Price must be a valid number with up to 2 decimal places'
    }
  },
  inStock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be an integer'
    }
  }
});

module.exports = mongoose.model('Product', ProductSchema);














