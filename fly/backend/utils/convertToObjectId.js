const mongoose = require("mongoose");

const convertToObjectId = (id) => {
  console.log(`Converting ID to ObjectId: ${id}`);
  if (
    mongoose.Types.ObjectId.isValid(id) &&
    String(new mongoose.Types.ObjectId(id)) === id
  ) {
    return mongoose.Types.ObjectId(id);
  } else {
    console.error(`Invalid ObjectId format: ${id}`);
    throw new Error("Invalid ObjectId format");
  }
};

module.exports = convertToObjectId;
