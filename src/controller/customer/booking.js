const scheduleBooking = async (req, res) => {
  try {
    const { date, time, service_id, jober_id, customer_id } = req.body;

    const booking = await Booking.create({
      date,
      time,
      service_id,
      jober_id,
      customer_id,
    });
    res.Response(200, "Booking created successfully", booking);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = {
  scheduleBooking,
};
