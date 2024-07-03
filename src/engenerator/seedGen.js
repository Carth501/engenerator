import { Rand } from 'rand-seed';

export function OldSeedControls() {

    function setSeed(baseSeed) {
        generateSubSeeds(baseSeed);
    }

    function generateSubSeeds(baseSeed) {
        let new_nums;
        if (baseSeed === null || baseSeed === "") {
            new_nums = generateUnseeded();
        }
        else {
            new_nums = generateSeeded(baseSeed);
        }
        console.log("generateSubSeeds!");
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
        console.log("Unseeded");
        const shopValues = [];
        for (var i = 0; i < 2; i++) {
            shopValues.push(Math.random());
        }
        return shopValues;
    }

    return (
        <div>
            Old Seed Controls
        </div>
    )
}