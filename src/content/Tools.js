
export const ageTransform = function (seed, mean, dev) {
    const age = Math.abs(gaussianRandom(seed))
    return Math.round(mean + age * dev);
}

export function gaussianRandom(seed = 0.5) {
    const u = 1 - seed;
    const v = seed;
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z;
}
