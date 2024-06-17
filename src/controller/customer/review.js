const JoberReview = require("../../models/JoberReview");
const Jober = require("../../models/jober");
const addReview = async (req, res) => {
  try {
    const review = await JoberReview.create({
      customer_id: req.user_id,
      ...req.body,
    });
    review.save();
    await Jober.findByIdAndUpdate(req.body.jober_id, {
      $inc: { reviews_count: 1, reviews_rating: req.body.rating },
    });
    res.Response(200, "Review added successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await JoberReview.findByIdAndUpdate(
      req.body.review_id,
      req.body
    );
    await Jober.findByIdAndUpdate(review.jober_id, {
      $inc: { reviews_rating: req.body.rating - review.rating },
    });
    res.Response(200, "Review updated successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const getReview = async (req, res) => {
  try {
    const review = await JoberReview.find({
      customer_id: req.user_id,
    }).sort({ createdAt: -1 });
    if (!review) {
      return res.Response(404, "Review not found");
    }
    res.Response(200, null, review);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await JoberReview.findByIdAndDelete(req.body.review_id);
    if (!review) {
      return res.Response(404, "Review not found");
    }
    await Jober.findByIdAndUpdate(review.jober_id, {
      $inc: { reviews_count: -1, reviews_rating: -review.rating },
    });
    res.Response(200, "Review deleted successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = {
  addReview,
  updateReview,
  getReview,
  deleteReview,
};
