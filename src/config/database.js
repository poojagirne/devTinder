const mongoose=require("mongoose")
const mongooseUrl="mongodb+srv://Pooja:poojagirne24@devtinder.hfzop4i.mongodb.net/devTinder"
const connectDB = async () => {
  await mongoose.connect(mongooseUrl);
};
module.exports = connectDB;
