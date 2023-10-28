import mongoose from "mongoose";
import { IUserPokemon } from "../../interface/base";
import pokedex from "../../constant/pokedex";

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Schema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})

Schema.virtual('pokemon').get(function() {
  return pokedex.find((item) => item.id === this.pokemonId)
})

export const UserPokemonModel = mongoose.model<IUserPokemon>('user-pokemon', Schema);

