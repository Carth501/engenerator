import { useState } from 'react';
import Rand from 'rand-seed';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './ShopGen.css';

let rand = new Rand('1234');

function ShopGen() {
    const [nums, setNums] = useState([]);

    function addToArray() {
        let additions = [
            rand.next()
        ];
        console.log(additions)
        setNums(nums.concat(additions))
    }

    function setSeed(new_seed) {
        rand = new Rand(new_seed);
    }

    return (
        <div className='content'>
            <div className='left-controls'>
                <Input
                    type="text"
                    id="seed"
                    placeholder='seed'
                    onChange={e => setSeed(e.target.value)} />
                <Button
                    variant="contained"
                    onClick={addToArray}
                    color="secondary">
                    Add to array
                </Button>
            </div>
            <div className='right-display'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    )
}

export default ShopGen;