import { SET_ROOT_SEED, SET_SHOP_OPTIONS, RUN_SHOP_GENERATE } from "./actionTypes";

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

export const setShopOptions = choices => ({
    type: SET_SHOP_OPTIONS,
    payload: {
        options: {
            "stockGen": choices.stockGen,
            "ownerGen": choices.ownerGen,
            "specialty": choices.specialty
        }
    }
})

export const runShopGen = () => ({
    type: RUN_SHOP_GENERATE
})