import { generateSubSeeds, generateUnseeded } from "../../engenerator/seedGen";
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
    }
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case RUN_SHOP_GENERATE: {
            let shopData;
            if (state.rootSeed) {
                shopData = generateShop(state.subSeeds, state.options);
            } else {
                shopData = generateShop(generateUnseeded(), state.options);
            }
            let shopDisplay = writeShopText(shopData);
            return {
                ...state,
                shopData,
                shopDisplay
            };
        }
        case SET_ROOT_SEED: {
            const { rootSeed } = action.payload;
            const subSeeds = generateSubSeeds(rootSeed);
            const shopData = generateShop(subSeeds, state.options);
            const shopDisplay = writeShopText(shopData);
            return {
                ...state,
                rootSeed,
                subSeeds,
                shopData,
                shopDisplay
            };
        }
        case SET_SHOP_OPTIONS: {
            return {
                ...state,
                options: action.payload.options
            };
        }
        default:
            return state;
    }
}
