const express = require("express");
const Customer = require("../../models/customer");
const Owner = require("../../models/owner");

const nearbyShops = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user_id);
    if (!customer || !customer.location) {
      return res.Response(404, "Customer not found");
    }

    const shops = await Owner.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: customer.location.coordinates,
          },
          distanceField: "distance",
          maxDistance: 5000, // 5 km in meters
          spherical: true,
        },
      },
      {
        $sort: { distance: 1 },
      },
    ]);

    res.Response(200, "Shops found", shops);
  } catch (err) {
    res.Response(500, err.message);
  }
};

module.exports = { nearbyShops };
