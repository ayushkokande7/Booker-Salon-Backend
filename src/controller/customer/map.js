const Customer = require("../../models/customer");
const Owner = require("../../models/owner");
const Jober = require("../../models/jober");
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
  } catch (err) {}
};

const nearbyJober = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user_id);
    if (!customer) {
      return res.Response(404, "User not found");
    }

    const nearbyOwners = await Owner.aggregate([
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
    ]);

    if (!nearbyOwners.length) {
      return res.Response(404, null, []);
    }

    const joberIds = nearbyOwners.reduce((acc, owner) => {
      return acc.concat(
        owner.jobers.map((jober) => ({
          joberId: jober,
          coordinates: owner.location.coordinates,
          shopImg: owner.shopImg,
        }))
      );
    }, []);

    const joberDetails = await Jober.find({
      _id: { $in: joberIds.map((j) => j.joberId) },
    });

    const jobersWithCoordinates = joberDetails.map((jober) => {
      const ownerData = joberIds.find(
        (j) => j.joberId.toString() === jober._id.toString()
      );
      return {
        ...jober.toObject(),
        coordinates: ownerData ? ownerData.coordinates : null,
        shopImg: ownerData ? ownerData.shopImg : null,
        rating: jober.reviews_count
          ? jober.reviews_rating / jober.reviews_count
          : 0,
      };
    });

    jobersWithCoordinates.sort((a, b) => b.rating - a.rating);

    return res.Response(200, null, jobersWithCoordinates);
  } catch (err) {}
};

module.exports = { nearbyShops, nearbyJober };
