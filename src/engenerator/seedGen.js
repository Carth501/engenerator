import Rand from 'rand-seed';

export function generateSubSeeds(baseSeed) {
    let new_nums;
    if (baseSeed === null || baseSeed === "") {
        new_nums = generateUnseeded();
    }
    else {
        new_nums = generateSeeded(baseSeed);
    }
    return new_nums;
}

function generateSeeded(seed) {
    const rand = new Rand(seed);
    const shopValues = [];
    for (var i = 0; i < 2; i++) {
        shopValues.push(rand.next());
    }
    return shopValues;
}

export function generateUnseeded() {
    const shopValues = [];
    for (var i = 0; i < 2; i++) {
        shopValues.push(Math.random());
    }
    return shopValues;
}

export function blendLocationAndSeed(latitude, longitude, globalSeed) {
    const latInt = Math.round(latitude * 100);
    const lonInt = Math.round(longitude * 100);
    const combined = (globalSeed * 100000 + latInt) * 100000 + lonInt;
    return combined;
}