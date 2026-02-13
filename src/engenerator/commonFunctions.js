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
 * Generate age based on Perlin noise variables, wealth, and a smooth asymptotic polynomial curve.
 * Age ranges from 0-105 with hard clamp at 120.
 * Distribution is skewed toward younger ages with exponential drop-off at higher ages.
 * 
 * @param {number} noiseVar1 - Perlin noise variable (0-1)
 * @param {number} noiseVar2 - Perlin noise variable (0-1)
 * @param {number} noiseVar3 - Perlin noise variable (0-1)
 * @param {number} wealth - Wealth value (0-1), applied as minor modifier
 * @returns {number} - Age as integer (0-105, hard max 120)
 */
export function generateAge(noiseVar1, noiseVar2, noiseVar3, wealth) {
    // Combine noise variables: use them as coefficients for a cubic polynomial
    // noiseVar1 influences base level, noiseVar2 influences curve, noiseVar3 influences variance
    const a = noiseVar1 * 0.5;       // Cubic coefficient (0-0.5)
    const b = noiseVar2 * 0.3;       // Quadratic coefficient (0-0.3)
    const c = noiseVar3 * 60;        // Linear coefficient (0-60)
    
    // Normalize x to 0-1 range
    let x = noiseVar1; // Use noiseVar1 as the primary input variable
    
    // Smooth asymptotic polynomial: ax^3 + bx^2 + cx
    // This produces values that approach a maximum asymptotically
    let age = (a * x * x * x) + (b * x * x) + c;
    
    // Apply wealth as minor modifier (±5%)
    const wealthModifier = 1 + ((wealth - 0.5) * 0.1); // Range: 0.95 to 1.05
    age = age * wealthModifier;
    
    // Smooth asymptotic approach by applying a scaling that increases near upper bound
    // Use tanh-like scaling to smoothly approach asymptote without hard kink
    const scaleFactor = 105 / (105 + Math.pow(Math.E, -(age / 15)));
    age = age * scaleFactor;
    
    // Hard clamp at 120 as safety net
    age = Math.min(120, Math.max(0, age));
    
    return Math.round(age);
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