import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://Clustor0:akjdfalsjslkkasd@cluster0.mrip0za.mongodb.net/cityscope?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URL);
};