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
    unseededGeneration: false,
    permitRegen: false
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case RUN_SHOP_GENERATE: {
            let shopData, permitRegen, unseededGeneration;
            if (state.rootSeed && state.rootSeed !== '') {
                shopData = generateShop(state.subSeeds, state.options);
                permitRegen = false;
                unseededGeneration = false;
            } else {
                shopData = generateShop(generateUnseeded(), state.options);
                permitRegen = true;
                unseededGeneration = true;
            }
            const shopDisplay = writeShopText(shopData);
            return {
                ...state,
                shopData,
                shopDisplay,
                permitRegen,
                unseededGeneration
            };
        }
        case SET_ROOT_SEED: {
            const { rootSeed } = action.payload;
            const subSeeds = generateSubSeeds(rootSeed);
            let shopData, permitRegen, unseededGeneration;
            if (state.rootSeed && state.rootSeed !== '') {
                shopData = generateShop(state.subSeeds, state.options);
                permitRegen = false;
                unseededGeneration = false;
            } else {
                shopData = generateShop(generateUnseeded(), state.options);
                permitRegen = true;
                unseededGeneration = true;
            }
            const shopDisplay = writeShopText(shopData);
            return {
                ...state,
                rootSeed,
                subSeeds,
                shopData,
                shopDisplay,
                permitRegen,
                unseededGeneration
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
