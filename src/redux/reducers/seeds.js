import { SET_ROOT_SEED, SET_SUB_SEEDS } from "../actionTypes";

const initialState = {
    rootSeed: "",
    subSeeds: []
};

export default function seedReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROOT_SEED: {
            const { rootSeed } = action.payload;
            return {
                ...state,
                rootSeed
            };
        }
        case SET_SUB_SEEDS: {
            const { subSeeds } = action.payload;
            return {
                ...state,
                subSeeds
            };
        }
        default:
            return state;
    }
}
