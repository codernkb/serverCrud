let Data = require("../Model/dataSchema");

module.exports = {
  create: async function (req, res, next) {
    try {
      console.log("Create API hit")
      let { name, email, mobile, age, hobbies, graduation, address, state, pincode } = req.body;
      let data = await new Data(
        {
          name: name,
          email: email,
          mobile: mobile,
          age: age,
          hobbies: hobbies,
          graduation: graduation,
          address: address,
          state: state,
          pincode: pincode
        }
      );
      let result = await data.save();
      res.send({ message: "Data Sent Successfully!!!", insertedData: result });
    } catch (error) {
      res.status(500).send({ message: "Failed to send Data.", error: error.message });
    }
  },

  fetchAll: async function (req, res, next) {
    try {
      console.log("fetchAll API hit")
      let list = await Data.find({ isDeleted: false });
      res.send(list);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch data.", error: error.message });
    }
  },
  delete: async function (req, res, next) {
    try {
      console.log("delete API hit")
      let deletedRecord = await Data.findByIdAndUpdate(req.query.id, { isDeleted: true }, { new: true });
      if (!deletedRecord) {
        return res.status(404).send({ message: "Data not found." });
      }
      res.send(deletedRecord);
    } catch (error) {
      res.status(500).send({ message: "Failed to delete data.", error: error.message });
    }
  },
  getDetailsById: async function (req, res, next) {
    try {
      console.log("getDetailsById API hit")
      let result = await Data.findById(req.query.id);
      if (!result) {
        return res.status(404).send({ message: "Data not found." });
      }
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch data.", error: error.message });
    }
  },
  updateById: async function (req, res, next) {
    try {
      console.log("getDetailsById API hit")
      let { name, email, mobile, age, hobbies, graduation, address, state, pincode } = req.body;
      let updatedData = {
        name: name,
        email: email,
        mobile: mobile,
        age: age,
        hobbies: hobbies,
        graduation: graduation,
        address: address,
        state: state,
        pincode: pincode
      };
      let result = await Data.findByIdAndUpdate(req.query.id, updatedData, { new: true });
      if (!result) {
        return res.status(404).send({ message: "Data not found." });
      }
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: "Failed to update data.", error: error.message });
    }
  }
}