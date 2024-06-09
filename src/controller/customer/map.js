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

// const nearbyJober = async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.user_id);
//     if (!customer) {
//       return res.Response(404, "User not found");
//     }
//     const jober = await Owner.aggregate([
//       {
//         $geoNear: {
//           near: {
//             type: "Point",
//             coordinates: customer.location.coordinates,
//           },
//           distanceField: "distance",
//           maxDistance: 5000, // 5 km in meters
//           spherical: true,
//         },
//       },
//       {
//         $lookup: {
//           from: "bookings",
//           localField: "_id",
//           foreignField: "jober_id",
//           as: "bookings",
//         },
//       },
//       {
//         $sort: { distance: 1 },
//       },
//     ]);

//     res.Response(200, null, jober);
//   } catch (err) {
//     res.Response(500, err.message);
//   }
// };

const nearbyJober = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user_id);
    if (!customer) {
      return res.Response(404, "User not found");
    }

    const owners = await Owner.aggregate([
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
        $lookup: {
          from: "jobers",
          localField: "_id",
          foreignField: "owner_id",
          as: "jobers",
        },
      },
      {
        $unwind: "$jobers",
      },
      {
        $lookup: {
          from: "JoberReview",
          localField: "jober._id",
          foreignField: "jober_id",
          as: "joberRatings",
        },
      },
      {
        $unwind: {
          path: "$joberRatings",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$jobers._id",
          fname: { $first: "$jobers.fname" },
          lname: { $first: "$jobers.lname" },
          mobile: { $first: "$jobers.mobile" },
          distance: { $first: "$distance" },
          averageRating: { $avg: "$joberRatings.rating" },
        },
      },
      {
        $sort: { averageRating: -1, distance: 1 },
      },
    ]);

    res.Response(200, null, owners);
  } catch (err) {
    res.Response(500, err.message);
  }
};

module.exports = { nearbyShops, nearbyJober };
