import { generateSubSeeds } from "../../engenerator/seedGen";
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
            const results = seededShopGenerator(subSeeds, options);
            return {
                ...state,
                rootSeed,
                options,
                ...results
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