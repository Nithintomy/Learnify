import mongoose from "mongoose";

const connectDB = mongoose.connect("mongodb://127.0.0.1:27017/Learnify")
  .then(() => {
    console.log('MongoDb Connected');
  })
  .catch((err) => {
    console.error(err);
  });

export default connectDB;
