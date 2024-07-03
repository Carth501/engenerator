import { generateSubSeeds } from "../../engenerator/seedGen";
import { SET_ROOT_SEED } from "../actionTypes"; // SET_SUB_SEEDS
const initialState = {
    rootSeed: "",
    subSeeds: []
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROOT_SEED: {
            const { rootSeed } = action.payload;
            const subSeeds = generateSubSeeds(rootSeed);
            const shopData = 2
            return {
                ...state,
                rootSeed,
                subSeeds
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
