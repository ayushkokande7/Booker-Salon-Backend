const Customer = require("../../models/customer");
const Owner = require("../../models/owner");
const nearbyShops = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user_id);
    if (!customer) {
      return res.Response(404, "User not found");
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
    res.Response(200, null, shops);
  } catch (err) {
    res.Response(500, err.message);
  }
};

const nearbyJober = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user_id);
    if (!customer) {
      return res.Response(404, "User not found");
    }
    const pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              customer.location.coordinates[0],
              customer.location.coordinates[1],
            ],
          },
          distanceField: "distance",
          maxDistance: 5000, // 5 km radius
          spherical: true,
        },
      },

      {
        $lookup: {
          from: "jobers", // Ensure the collection name matches exactly
          foreignField: "_id", // The field in the other collection
          localField: "jobers", // The field in the current collection
          as: "jobersDetails", // The name of the new field in the current collection
        },
      },
      // {
      //   $unwind: {
      //     path: "$jobers", // Specify the path to the field you want to unwind
      //   },
      // },
    ];
    const joberDetails = await Owner.aggregate(pipeline);
    res.Response(200, null, joberDetails);
  } catch (err) {
    res.Response(500, err.message);
  }
};

module.exports = { nearbyShops, nearbyJober };
