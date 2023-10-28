export const merge = (...args) => {
  return args.reduce((a, b) => Object.assign(a, b), {});
};
