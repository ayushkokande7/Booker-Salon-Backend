const Customer = require("../../models/customer");
const favourite = async (req, res) => {
  try {
    const { joberId } = req.body;
    const customer = await Customer.findById(req.user_id);
    if (!customer) return res.Response(404, "User not found");
    if (!customer.favourites.includes(joberId)) {
      customer.favourites.push(joberId);
      customer.save();
      return res.Response(200, "Favourite added successfully");
    } else {
      customer.favourites.remove(joberId);
      customer.save();
      return res.Response(200, "Favourite removed successfully");
    }
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const getFavourites = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user_id).populate(
      "favourites"
    );
    if (!customer) return res.Response(404, "User not found");
    return res.Response(200, null, customer.favourites);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = { favourite, getFavourites };
