import { noise } from '@chriscourses/perlin-noise';
import Rand from 'rand-seed';
import Occupations from '../content/Occupations.json';
import Personalities from '../content/Personalities.json';
import PersonNames from '../content/PersonNames.json';
import { blendLocationAndSeed } from './seedGen';

// Wealth class thresholds for mapping continuous wealth values to discrete classes
const WEALTH_WORKING_THRESHOLD = 0.6;
const WEALTH_MIDDLE_THRESHOLD = 0.9;

// Axis configuration for personality dimensions
const PERSONALITY_AXES = [
	{
		name: 'Personality 1',
		min: 0,
		max: 1
	},
	{
		name: 'Personality 2',
		min: 0,
		max: 1
	}
];

// Personality grid dimensions
const PERSONALITY_GRID_ROWS = 15;
const PERSONALITY_GRID_COLS = 15;

// Build personality grid with 217 traits mapped to 15x15 (225 cells)
// 8 cells in bottom-right corner will be "Unremarkable"
function buildPersonalityGrid() {
	const grid = [];
	let traitIndex = 0;
	
	for (let row = 0; row < PERSONALITY_GRID_ROWS; row++) {
		const gridRow = [];
		for (let col = 0; col < PERSONALITY_GRID_COLS; col++) {
			// Last 2 rows and last 2 columns contain "Unremarkable"
			if (row >= PERSONALITY_GRID_ROWS - 2 && col >= PERSONALITY_GRID_COLS - 2) {
				gridRow.push('Unremarkable');
			} else if (traitIndex < Personalities.length) {
				gridRow.push(Personalities[traitIndex]);
				traitIndex++;
			} else {
				gridRow.push('Unremarkable');
			}
		}
		grid.push(gridRow);
	}
	
	return grid;
}

// Box-Muller transform to generate normally-distributed random value
function boxMullerSample(rng, mean, variance, min, max) {
	let u1, u2, z0;
	let attempts = 0;
	const maxAttempts = 100;
	
	while (attempts < maxAttempts) {
		u1 = Math.max(rng.next(), 1e-10); // Avoid log(0)
		u2 = rng.next();
		
		z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
		const value = mean + z0 * Math.sqrt(variance);
		
		if (value >= min && value <= max) {
			return value;
		}
		
		attempts++;
	}
	
	// Clamp to bounds if too many attempts
	return Math.max(min, Math.min(max, mean));
}

// Uniform distribution sampler for personality axes
function uniformSample(rng, min, max) {
	return min + rng.next() * (max - min);
}

// Map wealth value to occupation class
function getOccupationByWealth(wealthValue, rng) {
	let wealthClass;
	
	if (wealthValue < WEALTH_WORKING_THRESHOLD) {
		wealthClass = 'Working Class';
	} else if (wealthValue < WEALTH_MIDDLE_THRESHOLD) {
		wealthClass = 'Middle Class';
	} else {
		wealthClass = 'Upper Class';
	}
	
	const occupations = Occupations[wealthClass];
	const occupationIndex = Math.floor(rng.next() * occupations.length);
	return occupations[occupationIndex];
}

// Get personality trait from grid based on P1 and P2 coordinates
function getPersonalityByGrid(p1, p2, personalityGrid) {
	const row = Math.floor(p1 * PERSONALITY_GRID_ROWS);
	const col = Math.floor(p2 * PERSONALITY_GRID_COLS);
	
	const clampedRow = Math.min(row, PERSONALITY_GRID_ROWS - 1);
	const clampedCol = Math.min(col, PERSONALITY_GRID_COLS - 1);
	
	return personalityGrid[clampedRow][clampedCol];
}

// Get random name
function getRandomName(rng) {
	const nameIndex = Math.floor(rng.next() * PersonNames.generic_english.length);
	return PersonNames.generic_english[nameIndex];
}

// Main character map generation function
export function writeCharacterMapData(count, latitude, longitude, seed) {
	if (seed === null || seed === "") {
		seed = Math.floor(Math.random() * 4294967296);
	}
	
	const blendedSeed = blendLocationAndSeed(latitude, longitude, seed);
	console.log(`Blended Seed: ${blendedSeed} (Global Seed: ${seed}, Lat: ${latitude}, Lon: ${longitude})`);
	const rng = new Rand(blendedSeed);
	const personalityGrid = buildPersonalityGrid();
	
	// Sample Perlin noise at the fixed location for wealth median and variance
	const wealthMedian = noise(latitude, longitude, 0);
	const wealthVariance = Math.abs(noise(latitude, longitude, 1)) + 0.1; // Ensure variance > 0
	
	const characters = [];
	
	for (let i = 0; i < count; i++) {
		// Sample personality axes uniformly
		const p1 = uniformSample(rng, 0, 1);
		const p2 = uniformSample(rng, 0, 1);
		
		// Sample wealth from normal distribution using Perlin noise-derived parameters
		const wealthValue = boxMullerSample(rng, wealthMedian, wealthVariance, 0, 1);
		
		const character = {
			name: getRandomName(rng),
			occupation: getOccupationByWealth(wealthValue, rng),
			personality: getPersonalityByGrid(p1, p2, personalityGrid),
			p1: parseFloat(p1.toFixed(3)),
			p2: parseFloat(p2.toFixed(3)),
			wealth: parseFloat(wealthValue.toFixed(3)),
			latitude: parseFloat(latitude.toFixed(2)),
			longitude: parseFloat(longitude.toFixed(2))
		};
		
		characters.push(character);
	}
	
	return {
		characters,
		location: {
			latitude: parseFloat(latitude.toFixed(2)),
			longitude: parseFloat(longitude.toFixed(2))
		},
		seed: blendedSeed
	};
}