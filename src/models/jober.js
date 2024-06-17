const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("../models/counter");

const joberSchema = new Schema({
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
  is_verified: {
    type: Boolean,
    default: false,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
    default: null,
  },
  OTP: Number,
  image: {
    type: String,
    default: "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg",
  },
  jober_id: {
    type: String,
    unique: true,
  },
  booking_status: {
    type: Boolean,
    default: false,
  },
  age: Number,
  gender: String,
  reviews_count: {
    type: Number,
    default: 0,
  },
  reviews_rating: {
    type: Number,
    default: 0,
  },
  bookings: {
    total: {
      type: Number,
      default: 0,
    },
    pending: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Number,
      default: 0,
    },
  },
});

joberSchema.pre("save", async function (next) {
  const jober = this;

  if (jober.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "jober" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const seq = counter.seq;
    const paddedSeq = String(seq).padStart(4, "0");
    jober.jober_id = `JB${paddedSeq}`;
  }
  next();
});

joberSchema.set("timestamps", true);
module.exports = mongoose.model("Jober", joberSchema);
