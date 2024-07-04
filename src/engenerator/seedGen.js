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

function generateUnseeded() {
    const shopValues = [];
    for (var i = 0; i < 2; i++) {
        shopValues.push(Math.random());
    }
    return shopValues;
}