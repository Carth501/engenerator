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
    },
    requiresRegen: false
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case RUN_SHOP_GENERATE: {
            let shopData, requiresRegen;
            if (state.rootSeed) {
                shopData = generateShop(state.subSeeds, state.options);
                requiresRegen = false;
            } else {
                shopData = generateShop(generateUnseeded(), state.options);
                requiresRegen = true;
            }
            let shopDisplay = writeShopText(shopData);
            return {
                ...state,
                shopData,
                shopDisplay,
                requiresRegen
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
                shopDisplay,
                requiresRegen: false
            };
        }
        case SET_SHOP_OPTIONS: {
            return {
                ...state,
                options: action.payload.options,
                requiresRegen: true
            };
        }
        default:
            return state;
    }
}
