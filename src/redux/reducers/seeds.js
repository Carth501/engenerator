import { generateSubSeeds } from "../../engenerator/seedGen";
import { generateShop } from "../../engenerator/writeShopData";
import { writeShopText } from "../../engenerator/writeShopDisplay";
import { SET_ROOT_SEED } from "../actionTypes"; // SET_SUB_SEEDS
const initialState = {
    rootSeed: "",
    subSeeds: [],
    options: {
        "stockGen": true,
        "ownerGen": true,
        "seed": null,
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
        // case SET_SUB_SEEDS: {
        //     const { subSeeds } = action.payload;
        //     return {
        //         ...state,
        //         subSeeds
        //     };
        // }
        default:
            return state;
    }
}
