let Data = require("../Model/dataSchema");

module.exports = {
  create: async function (req, res, next) {
    try {
      console.log("Create API hit")
      let { name, email, mobile, age, hobbies, graduation, address, state, pincode } = req.body;
      let duplicateEmail = await Data.findOne({ email });
      let duplicateMobile = await Data.findOne({ mobile });
      if(!duplicateEmail && !duplicateMobile){
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
        res.send({ success:"true", message: "Data Sent Successfully!!!", insertedData: result });
      } else {
        res.send({ message: "Data Already Exits with this Email Id or Mobile Number" });
      }

    } catch (error) {
      res.status(500).send({ success:"false", message: "Failed to send Data.", error: error.message });
    }
  },

  fetchAll: async function (req, res, next) {
    try {
      let list = await Data.find({ isDeleted: false });
      res.status(200).send({list,success:"true", message:"Data Fecth Sucessful"});
      console.log("fetchAll API hit")
    } catch (error) {
      res.status(500).send({success:"false", message: "Failed to fetch data.", error: error.message });
    }
  },
  delete: async function (req, res, next) {
    try {
      console.log("delete API hit",req.body&&req.body.id)
      let deletedRecord = await Data.findByIdAndUpdate(req.body.id, { isDeleted: true }, { new: true });
      if (!deletedRecord) {
        return res.status(404).send({success:"false", message: "Data not found." });
      }
      res.status(200).send({deletedRecord, success:"true", message:"Data Fecth Sucessful"});
    } catch (error) {
      res.status(500).send({success:"false", message: "Failed to delete data.", error: error.message });
    }
  },
  getDetailsById: async function (req, res, next) {
    try {
      console.log("getDetailsById API hit")
      let result = await Data.findById(req.body.id);
      if (!result) {
        return res.status(404).send({success:"false", message: "Data not found." });
      }
      res.status(200).send({result, success:"true", message:"Data Fecth Sucessful"});
    } catch (error) {
      res.status(500).send({success:"false", message: "Failed to fetch data.", error: error.message });
    }
  },
  updateById: async function (req, res, next) {
    try {
      console.log("updateById API hit")
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
      let result = await Data.findByIdAndUpdate(req.body.id, updatedData, { new: true });
      console.log(result)
      if (!result) {
        return res.status(404).send({success:"false", message: "Data not found." });
      }
      res.status(200).send({result, success:"true", message:"Data Fecth Sucessful"});
    } catch (error) {
      res.status(500).send({success:"false", message: "Failed to update data.", error: error.message });
    }
  }
}