import { generateSubSeeds } from "../../engenerator/seedGen";
import { generateShop } from "../../engenerator/writeShopData";
import { writeShopText } from "../../engenerator/writeShopDisplay";
import { SET_ROOT_SEED, SET_SHOP_OPTIONS } from "../actionTypes";
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
        case SET_ROOT_SEED: {
            const { rootSeed } = action.payload;
            const subSeeds = generateSubSeeds(rootSeed);
            const shopData = generateShop(subSeeds, state.options)
            const shopDisplay = writeShopText(shopData)
            return {
                ...state,
                rootSeed,
                subSeeds,
                shopData,
                shopDisplay
            };
        }
        case SET_SHOP_OPTIONS: {
            console.log("action.payload.options ", action.payload.options);
            return {
                ...state,
                options: action.payload.options
            };
        }
        default:
            return state;
    }
}
