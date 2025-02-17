const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OTP = require("../utils/generateOTP");

const bookingSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  jober_id: {
    type: Schema.Types.ObjectId,
    ref: "Jober",
  },
  status: {
    type: String,
    enum: ["pending", "cancelled", "completed"],
    default: "pending",
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  booking_code: {
    type: String,
  },
  services: [
    {
      name: String,
      price: Number,
    },
  ],
});

bookingSchema.pre("save", function (next) {
  this.booking_code = OTP();
  next();
});

bookingSchema.set("timestamps", true);
module.exports = mongoose.model("Booking", bookingSchema);
