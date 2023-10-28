import mongoose from "mongoose";

export const connect = async () => {
  await mongoose
    .connect(process.env.DB_MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      dbName: process.env.DB_MONGO_DATABASE
    })
    .then((res) => {
      console.log(
        "DB connected to %s:%s, db: %s",
        res.connection.host,
        res.connection.port,
        res.connection.db.databaseName
      );
    })
    .catch((e) => {
      console.log(`Cannot connect to the database with error: ${e}`);
    })
};
