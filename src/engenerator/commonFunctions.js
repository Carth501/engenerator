import Items from '../content/Items.json';
import Occupations from '../content/Occupations.json';
import PersonNames from '../content/PersonNames.json';
import Personalities from '../content/Personalities.json';

export function getRandomOfStringType(catagory, num, random = 0) {
    let value = num % 0.25 * 4;

    if (catagory === "person") {
        const randomValue = PersonNames.generic_english.length * value;
        const index = Math.floor(randomValue);
        return PersonNames.generic_english[index];
    }
    else if (catagory === "plural_item") {
        const randomValue = Object.keys(Items).length * value;
        const subcatagoryIndex = Math.floor(randomValue);
        const key = Object.keys(Items)[subcatagoryIndex];
        const list = Items[key];
        let itemIndex = Math.floor(random * Object.keys(list).length);
        const itemKey = Object.keys(list)[itemIndex]
        return list[itemKey].plural;
    }
    else if (catagory === "occupation") {
        const wealthKey = Object.keys(Occupations)[Math.floor(value)];
        const occupationValue = value % 0.5 * 2;
        const occupation = Math.floor(Occupations[wealthKey].length * occupationValue);
        return Occupations[wealthKey][occupation];
    }
    else if (catagory === "personality") {
        const personalityIndex = Math.floor(value * Personalities.length);
        return Personalities[personalityIndex];
    }
}

/**
 * Compute age distribution bump parameters based on Perlin noise at a location.
 * Creates irregular, organic bumps in the age distribution using Perlin noise.
 * 
 * @param {number} noiseVar1 - Perlin noise variable (0-1), controls bump frequency
 * @param {number} noiseVar2 - Perlin noise variable (0-1), controls bump amplitude
 * @returns {object} - { bumpFrequency, bumpAmplitude, locationSeed }
 */
export function getAgeBumpParams(noiseVar1, noiseVar2) {
    // Map noise to bump parameters
    const bumpFrequency = noiseVar1;        // Range: 0-1, controls spacing of bumps
    const bumpAmplitude = noiseVar2;        // Range: 0-1, controls bump height
    
    // Encode location seed for Perlin noise calls (use hash of the two noise values)
    const locationSeed = (noiseVar1 * 73856093) ^ (noiseVar2 * 19349663);
    
    return { bumpFrequency, bumpAmplitude, locationSeed };
}

/**
 * Calculate probability density for a given age using a bumpy decay waveform.
 * Base: exponential decay peaking at age 0
 * Modulation: Perlin noise creates irregular, organic bumps
 * Tail: steady decay preventing high probabilities at old ages
 * 
 * @param {number} age - Age value (0-120)
 * @param {number} bumpFrequency - Controls bump spacing (0-1)
 * @param {number} bumpAmplitude - Controls bump height (0-1)
 * @param {Function} noiseFunction - Function(ageInput, seed) returning Perlin noise (-1 to 1)
 * @param {number} locationSeed - Seed for Perlin noise to vary bumps by location
 * @returns {number} - Probability density value (>=0)
 */
export function getAgeProbabilityDensity(age, bumpFrequency, bumpAmplitude, noiseFunction, locationSeed) {
    // Base decay curve: exponential, peaks at age 0
    const decayScale = 30;
    const baseDecay = Math.exp(-age / decayScale);
    
    // Perlin noise modulation for irregular bumps
    // Frequency controls how "fast" the bumps oscillate
    const frequencyScale = 0.15 * bumpFrequency; // Range: 0-0.15
    const noiseInput = age * frequencyScale;
    
    // Get noise value (-1 to 1) and scale by amplitude
    const noiseValue = noiseFunction(noiseInput, locationSeed);
    const bumpModulation = 1 + (bumpAmplitude * 0.5 * noiseValue);
    
    // Steady increasing decay factor to taper off probability at high ages
    const ageDecayFactor = Math.max(0.01, 1 - (age / 150));
    
    // Combine: base decay * bump modulation * age decay factor
    const probability = baseDecay * bumpModulation * ageDecayFactor;
    
    return Math.max(0, probability);
}

/**
 * Generate age by rejection sampling from the bumpy decay distribution.
 * Each character independently samples, creating varied ages at the same location.
 * 
 * @param {Rand} rng - Seeded random number generator
 * @param {number} bumpFrequency - Bump frequency parameter (0-1)
 * @param {number} bumpAmplitude - Bump amplitude parameter (0-1)
 * @param {number} locationSeed - Location seed for Perlin noise
 * @param {Function} noiseFunction - Function(ageInput, seed) for Perlin noise
 * @param {number} wealth - Wealth value (0-1), applied as minor modifier (±5%)
 * @returns {number} - Age as integer (0-120)
 */
export function generateAge(rng, bumpFrequency, bumpAmplitude, locationSeed, noiseFunction, wealth) {
    const maxIterations = 100;
    
    // Find the maximum probability density to use for rejection sampling
    const maxProbability = getAgeProbabilityDensity(0, bumpFrequency, bumpAmplitude, noiseFunction, locationSeed);
    
    for (let iter = 0; iter < maxIterations; iter++) {
        // Sample random age uniformly
        const candidateAge = rng.next() * 120;
        
        // Evaluate probability at this age
        const candidateProbability = getAgeProbabilityDensity(candidateAge, bumpFrequency, bumpAmplitude, noiseFunction, locationSeed);
        
        // Acceptance test: accept with probability proportional to density
        const acceptanceRoll = rng.next() * maxProbability;
        
        if (acceptanceRoll < candidateProbability) {
            // Accept this age
            let age = candidateAge;
            
            // Apply wealth as minor modifier (±5%)
            const wealthModifier = 1 + ((wealth - 0.5) * 0.1);
            age = age * wealthModifier;
            
            // Hard clamp at 120
            age = Math.min(120, Math.max(0, age));
            
            return Math.round(age);
        }
    }
    
    // Fallback (rare): if rejection sampling doesn't converge, return young age
    return Math.round(rng.next() * 30);
}

/**
 * Calculate retirement probability based on age.
 * Uses the curve (age/100)^4 to provide very low probability at young ages
 * and increasing probability at older ages.
 * 
 * @param {number} age - Character age (0-120)
 * @returns {number} - Probability value (0-1)
 */
export function getRetirementProbability(age) {
    const normalizedAge = age / 100;
    return Math.pow(normalizedAge, 4);
}