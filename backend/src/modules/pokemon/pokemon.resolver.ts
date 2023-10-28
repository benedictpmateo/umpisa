import { GraphQLError } from "graphql";
import pokedex from "../../constant/pokedex";
import { UserModel } from "../../database/models/user";
import { UserPokemonModel } from "../../database/models/user-pokemon";

const PokemonResolver = {
  Query: {
    /**
     * @name pokemons
     * @description list all pokemons in the pokedex
     */
    pokemons: (_, args: { size?: number; page?: number }, { auth }) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      let { size, page } = args;

      if (size || page) {
        size = size || 10;
        page = page || 1;
        const currentIndex = (page - 1) * size;

        return pokedex.slice(currentIndex, currentIndex + size);
      }
      return pokedex
    },
    /**
     * @name pokemon
     * @description get pokemon by pokedex ID
     */
    pokemon: (_, args: { id: number }, { auth }) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      return pokedex.find(({ id }) => id === args.id);
    },
    /**
     * @name myPokemons
     * @description retrieve my pokemons
     */
    myPokemons: async (_, __, { auth, user }) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      const currentUser = await UserModel.findOne({ _id: user._id }).populate({
        path: "caughtPokemon",
        populate: [
          {
            path: "user",
          },
        ],
      }).exec();
      const json = currentUser.toJSON();
      return json.caughtPokemon;
    },
  },
  Mutation: {
    /**
     * @name catchPokemon
     * @description Add pokemon to user collection
     * @param args "id: string" - pokedex ID
     */
    catchPokemon: async (_, args: { pokedexId: number }, { auth, user }) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      const { pokedexId } = args;
      const pokemon = pokedex.find((pokemon) => pokemon.id === pokedexId);
      const currentUser = await UserModel.findOne({ _id: user?._id });
      if (!currentUser) throw new GraphQLError("Bad request");

      const caughtPokemon = new UserPokemonModel({
        userId: currentUser._id,
        pokemonId: pokedexId,
      });
      const doc = await caughtPokemon.save();
      const userPokemon = await UserPokemonModel.findOne({ _id: doc._id })
        .populate({
          path: "user",
          populate: {
            path: "caughtPokemon",
          },
        })
        .exec();
      console.log(userPokemon.toJSON());
      return userPokemon.toJSON();
    },
    /**
     * @name releasePokemon
     * @description Remove pokemon from user
     * @param args "userPokemonId: string"
     */
    releasePokemon: async (
      _,
      args: { userPokemonId: string },
      { auth, user }
    ) => {
      if (!auth) throw new GraphQLError("You are not authenticated");
      const { userPokemonId } = args;
      try {
        const doc = await UserPokemonModel.findOneAndDelete({
          _id: userPokemonId,
          userId: user._id,
        });
        if (doc) return { status: true };
        throw new GraphQLError("Invalid parameters");
      } catch (error) {
        throw new GraphQLError("Bad request");
      }
    },
  },
};

export default PokemonResolver;
