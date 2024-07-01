import Input from '@mui/material/Input';
import Rand from 'rand-seed';
import { useDispatch } from 'react-redux';
import { setNums } from '../features/nums';

export function SeedControls() {
    const dispatch = useDispatch()

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
        dispatch(setNums(new_nums))
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
        <Input
            type="text"
            id="seed"
            placeholder='seed'
            onChange={e => setSeed(e.target.value)} />
    )
}