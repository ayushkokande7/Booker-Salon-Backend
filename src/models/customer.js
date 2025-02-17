const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    default: null,
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
  OTP: {
    type: Number,
    default: null,
  },
  FCM_token: {
    type: String,
    default: null,
  },
  JWT: String,
  reviewsCount: Number,
  is_verified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
