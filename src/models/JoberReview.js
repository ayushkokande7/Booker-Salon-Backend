const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const joberReviewSchema = new Schema({
  jober_id: {
    type: Schema.Types.ObjectId,
    ref: "Jober",
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  rating: Number,
  description: String,
  images: [String],
});

joberReviewSchema.set("timestamps", true);

module.exports = mongoose.model("JoberReview", joberReviewSchema);
