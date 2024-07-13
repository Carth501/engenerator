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