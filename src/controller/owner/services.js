const Service = require("../../models/services");
const addServices = async (req, res) => {
  try {
    const ser = await Service.findOne({ owner_id: req.user_id });
    if (!ser) {
      const { name, image, price } = req.body;
      const service = await Service({
        owner_id: req.user_id,
        service: [{ name, image, price }],
      });
      service.save();
    } else {
      ser.services.push(req.body.service);
      ser.save();
    }
    res.Response(200, "Service added successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const getServices = async (req, res) => {
  try {
    const ser = await Service.findOne({ owner_id: req.user_id });
    if (!ser) {
      return res.Response(404, "No service found");
    }
    res.Response(200, "Service found", ser.services);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const editServices = async (req, res) => {
  try {
    const { id } = req.body;
    const ser = await Service.findOne({ owner_id: req.user_id });
    if (!ser) {
      return res.Response(404, "No service found");
    }
    ser.services.find((x) => x._id == id).$set(req.body);
    ser.save();
    res.Response(200, "Service updated successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const deleteServices = async (req, res) => {
  try {
    const { id } = req.body;
    const ser = await Service.findOne({ owner_id: req.user_id });
    if (!ser) {
      return res.Response(404, "No service found");
    }
    ser.services.remove(id);
    ser.save();
    res.Response(200, "Service deleted successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = { addServices, getServices, editServices, deleteServices };
