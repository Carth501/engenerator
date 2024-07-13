import { getRandomOfStringType } from './commonFunctions.js';

export function generateCharacter(num, options) {
    const character = {};
    character["name"] = getRandomOfStringType("person", num)
    character["occupation"] = getRandomOfStringType("occupation", num);
    character["personality"] = getRandomOfStringType("personality", num);
    return character;
}