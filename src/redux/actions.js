import { SET_ROOT_SEED } from "./actionTypes"; // SET_SHOP_DATA, SET_SHOP_DISPLAY, SET_SUB_SEEDS


export const setSeed = seedString => ({
    type: SET_ROOT_SEED,
    payload: {
        rootSeed: seedString
    }
});

// export const setSubSeeds = seeds => ({
//     type: SET_SUB_SEEDS,
//     payload: {
//         subseed: seeds
//     }
// })

// export const setShopData = data => ({
//     type: SET_SHOP_DATA,
//     payload: {
//         shopData: data
//     }
// })

// export const setShopDisplay = shopString => ({
//     type: SET_SHOP_DISPLAY,
//     payload: {
//         shopString: shopString
//     }
// })