export const getAnimationDelay = {
  Instant: 0,
  Fast: 10,
  Normal: 50,
  Slow: 100,
};

export const animationSpeeds = Object.keys(getAnimationDelay);

export const getWeight = {
  Air: 1,
  Grass: 3,
  Water: 5,
};

export const cellWeights = Object.keys(getWeight);
