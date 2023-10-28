import SHA56 from "crypto-js/sha256";

import { UserModel } from "../../database/models/user";
import type {
  CreateAccountRequest,
  LoginAccountRequest,
} from "../../interface/base";
import { GraphQLError } from "graphql";
import { generateAccessToken } from "../../utils/jwt";

const UserResolver = {
  Query: {
    user: async (_, __, { auth, user }) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      const current = await UserModel.findOne({ _id: user._id }).populate({
        path: "caughtPokemon",
      }).exec();
      return current.toJSON();
    },
  },
  Mutation: {
    loginAccount: async (_, args: { body: LoginAccountRequest }, context) => {
      console.log(context);
      const user = await UserModel.findOne({
        email: args.body.email.toLowerCase(),
      });
      if (!user) {
        throw new GraphQLError("Invalid credentials");
      }
      const formPassword = SHA56(args.body.password).toString();
      if (formPassword !== user.password) {
        throw new GraphQLError("Invalid credentials");
      }
      const token = generateAccessToken({ _id: user._id, email: user.email });
      return {
        token,
      };
    },
    createAccount: async (_, args: { body: CreateAccountRequest }) => {
      const isExist = await UserModel.findOne({
        email: args.body.email.toLowerCase(),
      });
      if (isExist) {
        throw new GraphQLError("User already exists", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }
      const hashPassword = SHA56(args.body.password).toString();
      const body = {
        ...args.body,
        email: args.body.email.toLowerCase(),
        password: hashPassword,
      };
      const user = new UserModel(body);
      await user.save();

      const token = generateAccessToken({ _id: user._id, email: user.email });
      return {
        token,
      };
    },
  },
};

export default UserResolver;
