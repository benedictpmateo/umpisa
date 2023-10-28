const PokemonTypeDef = `
  extend type Query {
    pokemons(size: Int, page: Int): [Pokemon!]
    pokemon(id: Int!): Pokemon
    myPokemons: [UserPokemon]
  }

  extend type Mutation {
    catchPokemon(pokedexId: Int!): UserPokemon!
    releasePokemon(userPokemonId: String!): ReleasePokemonResponse!
  }

  type Pokemon {
    id: Int!
    type: [String]
    name: PokemonName
    base: PokemonBase
  }

  type PokemonName {
    english: String
    japanese: String
    chinese: String
    french: String
  }

  type PokemonBase {
    HP: Int
    Attack: Int
    Defense: Int
    SpecialAttack: Int
    SpecialDefense: Int
    Speed: Int
  }

  type UserPokemon {
    _id: ID!
    userId: String
    pokemonId: Int
    pokemon: Pokemon
    user: User
    createdAt: String
    updatedAt: String
  }

  # Response
  type CatchPokemonResponse {
    pokemon: Pokemon!
  }

  type ReleasePokemonResponse {
    status: Boolean!
  }
`

export default PokemonTypeDef;
