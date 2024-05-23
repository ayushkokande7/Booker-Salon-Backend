const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
  services: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});
serviceSchema.set("timestamps", true);
module.exports = mongoose.model("Service", serviceSchema);
