import SHA56 from "crypto-js/sha256";

import { UserModel } from "../../database/models/user";
import type {
  CreateAccountRequest,
  LoginAccountRequest,
  UpdateAccountRequest,
} from "../../interface/base";
import { GraphQLError } from "graphql";
import { generateAccessToken } from "../../utils/jwt";
import type { Context } from "../../app";

const UserResolver = {
  Query: {
    user: async (_, __, { auth, user, models }) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      const current = await models.UserModel.findOne({ _id: user._id })
        .populate({
          path: "caughtPokemon",
        })
        .exec();
      return current.toJSON();
    },
    rankings: async (_, __, { auth, user, models }: Context) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      const users = await models.UserModel.find()
        .populate("caughtPokemon")
        .exec();

      return users
        .map((user) => {
          return {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            numberOfPokemons: user.caughtPokemon.length,
          };
        })
        .sort((a, b) => b.numberOfPokemons - a.numberOfPokemons);
    },
  },
  Mutation: {
    loginAccount: async (
      _,
      args: { body: LoginAccountRequest },
      context: Context
    ) => {
      const user = await context.models.UserModel.findOne({
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
    createAccount: async (
      _,
      args: { body: CreateAccountRequest },
      context: Context
    ) => {
      const isExist = await context.models.UserModel.findOne({
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
    updateAccount: async (
      _,
      args: { body: UpdateAccountRequest },
      context: Context
    ) => {
      if (!context?.auth) throw new GraphQLError("You are not authenticated");
      const isValidAccount = await context.models.UserModel.findOne({
        _id: args.body.userId,
      });
      const isExist = await context.models.UserModel.findOne({
        email: args.body.email.toLowerCase(),
      });
      if (!isValidAccount) {
        throw new GraphQLError("Invalid user id");
      }
      if (isExist && isValidAccount && isValidAccount._id.toString() !== isExist._id.toString()) {
        throw new GraphQLError("Email is already used");
      }
      await context.models.UserModel.updateOne(
        {
          _id: args.body.userId,
        },
        {
          $set: {
            email: args.body.email.toLowerCase(),
            firstName: args.body.firstName,
            lastName: args.body.lastName,
          },
        }
      );

      return {
        status: true,
      };
    },
  },
};

export default UserResolver;
