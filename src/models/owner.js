const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
