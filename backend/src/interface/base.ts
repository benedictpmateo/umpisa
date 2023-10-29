export interface IBaseModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IBaseModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  caughtPokemon?: IUserPokemon[];
}

export interface IUserPokemon extends IBaseModel {
  userId: string;
  pokemonId: number;
  pokemon?: IPokedex;
  user?: IUser;
}

export interface IPokedexName {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

export interface IPokedexBase {
  HP: number;
  Attack: number;
  Defense: number;
  SpecialAttack: number;
  SpecialDefense: number;
  Speed: number;
}

export interface IPokedex {
  id: number;
  type: string[];
  name: IPokedexName;
  base: IPokedexBase;
}

export interface IPokemonType {
  english: string;
  chinese: string;
  japanese: string;
}

export interface LoginAccountRequest {
  email: string;
  password: string;
}

export interface CreateAccountRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateAccountRequest {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}
