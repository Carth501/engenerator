import { getRandomOfStringType } from './commonFunctions.js';

export function generateCharacter(num, options) {
    const character = {};
    character["name"] = getRandomOfStringType("person", num)
    character["occupation"] = getRandomOfStringType("occupation", num);
    return character;
}