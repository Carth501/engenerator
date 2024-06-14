import { useState } from 'react';
import Rand from 'rand-seed';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './ShopGen.css';
import ShopNames from './ShopNames.json'
import PersonNames from './PersonNames.json'

let rand = new Rand('1234');

function ShopGen() {
    const [nums, setNums] = useState([]);
    const [results, setResults] = useState("");

    function generate() {
        let text = writeShop()
        setResults(text.name)
    }

    function setSeed(new_seed) {
        rand = new Rand(new_seed);
        const shopValues = [];
        for (var i = 0; i < 4; i++) {
            shopValues.push(rand.next());
        }
        setNums(shopValues);
    }

    function writeShop() {
        const shop = {};
        if (nums[0] > 0.4 && false) {
            shop["name"] = getGenericName();
        }
        else {
            shop["name"] = getSpecificName();
        }
        return shop;
    }

    function getGenericName() {
        let value = nums[0] % 0.4 * 2.5;
        let nameIndex = Math.floor(ShopNames.generic_names.length * value);
        return ShopNames.generic_names[nameIndex];
    }

    function getSpecificName() {
        let value = nums[0] % 0.5 * 2;
        return getNamedAfterPerson()
        // if (value > 0.5) {
        // }
    }

    function getNamedAfterPerson() {
        let value = nums[0] % 0.25 * 4;
        const def = ShopNames.specific_names.named_after_person;
        let name = ""
        console.log(def)
        for (let i = 0; i < def.name.length; i++) {
            if (def.name.length > i) {
                name = name.concat(def.name[i])
            }
            if (def.inputs.length > i) {
                name = name.concat(getRandomOfStringType(def.inputs[i]))
            }
        }
        return name;
    }

    function getRandomOfStringType(catagory) {
        const value = nums[0] % 0.2 * 5;
        if (catagory === "person") {
            const index = Math.floor(PersonNames.generic_english.length * value)
            return PersonNames.generic_english[index]
        }
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
                    onClick={generate}
                    color="secondary">
                    Generate Shop
                </Button>
            </div>
            <div className='right-display'>
                {results}
            </div>
        </div>
    )
}

export default ShopGen;