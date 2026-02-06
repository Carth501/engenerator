import Rand from 'rand-seed';
import { generateCharacter } from "../../engenerator/writeCharacterData";
import { writeCharacterText } from "../../engenerator/writeCharacterDisplay";
import { writeCharacterMapData } from "../../engenerator/writeCharacterMap";
import { generateShop } from "../../engenerator/writeShopData";
import { writeShopText } from "../../engenerator/writeShopDisplay";
import { RUN_CHARACTER_MAP_GENERATE, RUN_SHOP_GENERATE } from "../actionTypes";

const initialState = {
    rootSeed: "",
    shopOptions: {
        stockGen: true,
        ownerGen: true,
        specialty: 'general',
        shopCookieProcessed: false
    },
    characterMapData: null
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case RUN_SHOP_GENERATE: {
            let { rootSeed, shopOptions } = action.payload;
            let resultCharacter, resultShop;
            if (rootSeed === null || rootSeed === "") {
                rootSeed = Math.floor(Math.random() * 4294967296);
            }
            const rand = new Rand(rootSeed);
            resultShop = seededShopGenerator(rand.next(), shopOptions);
            resultCharacter = seededCharacterGenerator(rand.next());
            return {
                ...state,
                rootSeed,
                shopOptions,
                ...resultCharacter,
                ...resultShop
            };
        }
        case RUN_CHARACTER_MAP_GENERATE: {
            let { rootSeed, characterCount, latitude, longitude } = action.payload;
            if (rootSeed === null || rootSeed === "") {
                rootSeed = Math.floor(Math.random() * 4294967296);
            }
            const characterMapData = writeCharacterMapData(characterCount, latitude, longitude, rootSeed);
            return {
                ...state,
                rootSeed,
                characterMapData
            };
        }
        default:
            return state;
    }
}

function seededShopGenerator(subSeeds, shopOptions) {
    const shopData = generateShop(subSeeds, shopOptions);
    const shopDisplay = writeShopText(shopData);
    return { shopData, shopDisplay };
}

function seededCharacterGenerator(seed, options) {
    const characterData = generateCharacter(seed, options);
    const characterDisplay = writeCharacterText(characterData);
    return { characterData, characterDisplay };
}
