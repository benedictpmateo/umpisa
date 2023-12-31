export const generateAnAvatar = (email: string) => {
  const asciisum = email.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const MAX = 809;
  const ID = asciisum % (MAX + 1);
  return ID > 0 ? ID : 1;
};

export const createPokemonAvatarUrl = (id: string | number) => {
  return `/assets/pokedex/${String(id).padStart(3,"0")}MS.png`
}
