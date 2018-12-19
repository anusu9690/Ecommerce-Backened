const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  descrition: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true
  },
  codEligible: {
    type: Boolean,
    required: true,
    default: true,
    validate: {
      validator: function(value) {
        return !(this.price >= 25000 && this.codEligible);
      },
      message: function() {
        return "cod eligible is not available for product above 25000";
      }
    }
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product
};
