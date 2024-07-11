export const getRootSeed = store => store.seed.rootSeed;

// export const getSubSeeds = store => store.subSeeds;

// export const getSubSeedByID = (store, index) =>
//     getSubSeeds(store) ? { ...getSubSeeds(store)[index] } : {};

// export const getShopData = store => store.shopData;

export const getShopDisplay = store => store.seed.shopDisplay;

export const getOptions = store => store.seed.options;

export const getCharacterDisplay = store => store.seed.characterDisplay;

export const shopCookieProcessed = store => store.seed.options.shopCookieProcessed;