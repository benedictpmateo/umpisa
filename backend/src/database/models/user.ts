import mongoose from "mongoose";
import { IUser } from "../../interface/base";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Schema.virtual('caughtPokemon', {
  ref: 'user-pokemon',
  localField: '_id',
  foreignField: 'userId',
})

export const UserModel = mongoose.model<IUser>("user", Schema);
