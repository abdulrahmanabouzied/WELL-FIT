import mongoose from "mongoose";

const connection = async () => {
  try {
    const result = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to the database Successfully!`);
  } catch (error) {
    console.log(`db connection error: ${error}`);
  }
};

export default connection;
