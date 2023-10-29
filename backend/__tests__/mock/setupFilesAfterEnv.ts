import assert from "node:assert";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";
import config from "./config";
import { UserModel } from "../../src/database/models/user";
import { SHA256 } from "crypto-js";
import { generateAccessToken } from "../../src/utils/jwt";

const createInitialAccount = async () => {
  try {
    const hashPassword = SHA256(config.MockAccount.password).toString();
    const body = {
      ...config.MockAccount,
      email: config.MockAccount.email.toLowerCase(),
      password: hashPassword,
    };
    const user = new UserModel(body);
    await user.save();

    const token = generateAccessToken({ _id: user._id, email: user.email });
    return token;
  } catch (error) {
    return null;
  }
};

beforeAll(async () => {
  await mongoose.connect(process.env["MONGO_URI"]);
  await mongoose.connection.db.dropDatabase();
  const token = await createInitialAccount();
  assert(!!token, "token must be created");

  // Global Variables
  global.__UmpisaToken = token;
  global.__UmpisaPokemonId = config.MockTokenId; // pokedex ID
  global.__UmpisaMockAccount = config.MockAccount;
  global.__UmpisaAuthHeaders = {
    authorization: `Bearer ${token}`,
  };
});

afterAll(async () => {
  await mongoose.disconnect();
});
