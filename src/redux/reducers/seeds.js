import { generateSubSeeds } from "../../engenerator/seedGen";
import { generateShop } from "../../engenerator/writeShopData";
import { writeShopText } from "../../engenerator/writeShopDisplay";
import { RUN_SHOP_GENERATE, SET_ROOT_SEED, SET_SHOP_OPTIONS } from "../actionTypes";
const initialState = {
    rootSeed: "",
    subSeeds: [],
    options: {
        "stockGen": true,
        "ownerGen": true,
        "specialty": 'general'
    },
    permitRegen: false
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case RUN_SHOP_GENERATE: {
            const { rootSeed } = state;
            const subSeeds = generateSubSeeds(rootSeed);
            const results = seededShopGenerator(subSeeds, state.options);
            const permitRegen = !rootSeed || rootSeed === null;
            return {
                ...state,
                permitRegen,
                ...results
            };
        }
        case SET_ROOT_SEED: {
            const { rootSeed } = action.payload;
            const subSeeds = generateSubSeeds(rootSeed);
            const results = seededShopGenerator(subSeeds, state.options);
            const permitRegen = !rootSeed || rootSeed === null;
            return {
                ...state,
                rootSeed,
                subSeeds,
                permitRegen,
                ...results
            };
        }
        case SET_SHOP_OPTIONS: {
            return {
                ...state,
                options: action.payload.options,
                permitRegen: true
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