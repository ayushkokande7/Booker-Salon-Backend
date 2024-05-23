const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  age: Number,
  gender: String,
  address: String,
  city: String,
  ZIP: Number,
  OTP: Number,
  JWT: String,
  reviewsCount: Number,
  is_verified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Jober",
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [28.60491, 77.0984587],
    },
  },
});
customerSchema.index({ location: "2dsphere" });
customerSchema.set("timestamps", true);
module.exports = mongoose.model("Customer", customerSchema);
