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
  image: {
    type: String,
    default: "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg",
  },
  shopImg: {
    type: String,
    default:
      "https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png",
  },
  OTP: Number,
  shopName: String,
  shopType: {
    type: String,
    enum: ["unisexsalon", "mansalon", "beautiparlour", "Spa"],
  },
  shop_id: String,
  is_verified: {
    type: Boolean,
    default: false,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  jobers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Jober",
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
});
ownerSchema.index({ location: "2dsphere" });
ownerSchema.set("timestamps", true);

module.exports = mongoose.model("Owner", ownerSchema);
