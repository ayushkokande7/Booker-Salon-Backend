const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
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
  image: String,
  shopImg: String,
  OTP: Number,
  shopName: String,
  shop_id: String,
  is_verified: {
    type: Boolean,
    default: false,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
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
    },
  },
});
ownerSchema.index({ location: "2dsphere" });
ownerSchema.set("timestamps", true);

module.exports = mongoose.model("Owner", ownerSchema);
