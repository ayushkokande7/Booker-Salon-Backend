const Jober = require("../../models/jober");
const Owner = require("../../models/owner");
const onOffBooking = async (req, res) => {
  try {
    const jober = await Jober.findById(req.user_id);
    if (!jober) return res.Response(404, "Jober not found");
    if (jober.owner_id === null)
      return res.Response(400, "Connect with the shop for booking");
    jober.booking_status = !jober.booking_status;
    jober.save();
    return res.Response(200, "Booking status updated successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const unlinkShop = async (req, res) => {
  try {
    const { mobile } = req.body;
    const jober = await Jober.findById(req.user_id);
    if (!jober) return res.Response(404, "Jober not found");
    if (jober.mobile !== mobile)
      return res.Response(400, "Invalid mobile number");
    await Owner.findByIdAndUpdate(jober.owner_id, {
      $pull: { jobers: jober._id },
    });
    jober.owner_id = null;
    jober.booking_status = false;
    jober.save();
    return res.Response(200, "Shop unlinked successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = { onOffBooking, unlinkShop };
