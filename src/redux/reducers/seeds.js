import { generateSubSeeds } from "../../engenerator/seedGen";
import { generateCharacter } from "../../engenerator/writeCharacterData";
import { writeCharacterText } from "../../engenerator/writeCharacterDisplay";
import { generateShop } from "../../engenerator/writeShopData";
import { writeShopText } from "../../engenerator/writeShopDisplay";
import { RUN_SHOP_GENERATE } from "../actionTypes";

const initialState = {
    rootSeed: "",
    options: {
        "stockGen": true,
        "ownerGen": true,
        "specialty": 'general'
    }
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case RUN_SHOP_GENERATE: {
            const { rootSeed, options } = action.payload;
            const subSeeds = generateSubSeeds(rootSeed);
            const resultShop = seededShopGenerator(subSeeds, options);
            const resultCharacter = seededCharacterGenerator(subSeeds[0]);
            return {
                ...state,
                rootSeed,
                options,
                ...resultCharacter,
                ...resultShop
            };
        }
        default:
            return state;
    }
}

function seededShopGenerator(subSeeds, options) {
    const shopData = generateShop(subSeeds, options);
    const shopDisplay = writeShopText(shopData);
    return { shopData, shopDisplay };
}

function seededCharacterGenerator(seed, options) {
    const characterData = generateCharacter(seed, options);
    const characterDisplay = writeCharacterText(characterData);
    return { characterData, characterDisplay };
}