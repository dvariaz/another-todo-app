export const generateRandomDimension = (min: number, max: number) => {
  const dimension = Math.random() * max + min;

  return `${dimension}px`;
};
