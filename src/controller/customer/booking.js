const Booking = require("../../models/bookings");
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find({
      customer_id: req.user_id,
    }).sort({ createdAt: -1 });
    if (!booking) {
      return res.Response(404, "Booking not found");
    }
    res.Response(200, null, booking);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const scheduleBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      customer_id: req.user_id,
      ...req.body,
    });
    booking.save();
    res.Response(200, "Booking created successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, {
      status: "cancelled",
    });
    if (!booking) {
      return res.Response(404, "Booking not found");
    }
    booking.save();
    res.Response(200, "Booking cancelled successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = {
  getBooking,
  scheduleBooking,
  cancelBooking,
};
