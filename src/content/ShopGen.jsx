import { useState } from 'react';
import Rand from 'rand-seed';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './ShopGen.css';
import ShopNames from './ShopNames.json'
import PersonNames from './PersonNames.json'
import Items from './Items.json'

let rand = new Rand('1234');

function ShopGen() {
    const [nums, setNums] = useState([]);
    const [results, setResults] = useState("");

    function generate() {
        let shop = generateShop()
        setResults(writeText(shop))
    }

    function setSeed(new_seed) {
        rand = new Rand(new_seed);
        const shopValues = [];
        for (var i = 0; i < 4; i++) {
            shopValues.push(rand.next());
        }
        setNums(shopValues);
    }

    function writeText(shop) {
        let text = "";
        text += "Name: " + shop.name + "\n";
        text += "Owner: " + shop.owner;
        console.log(text);
        return text;
    }

    function generateShop() {
        const shop = {};
        shop["owner"] = getRandomOfStringType("person")
        if (nums[0] > 0.4) {
            getGenericName(shop);
        }
        else {
            getSpecificName(shop);
        }
        return shop;
    }

    function getGenericName(shop) {
        let value = nums[0] % 0.4 * 2.5;
        let nameIndex = Math.floor(ShopNames.generic_names.length * value);
        shop["name"] = ShopNames.generic_names[nameIndex];
    }

    function getSpecificName(shop) {
        let value = nums[0] % 0.5 * 2;
        if (value > 0.2) {
            getNamedAfterPerson(shop);
        }
        else {
            getNamedAfterItem(shop);
        }
    }

    function getNamedAfterItem(shop) {
        const def = ShopNames.specific_names.named_after_item;
        let name = "";
        for (let i = 0; i < def.name.length; i++) {
            if (def.name.length > i) {
                name = name.concat(def.name[i]);
            }
            if (def.inputs.length > i) {
                name = name.concat(getRandomOfStringType(def.inputs[i]));
            }
        }
        shop["name"] = name;
    }

    function getNamedAfterPerson(shop) {
        const def = ShopNames.specific_names.named_after_person;
        let name = "";
        for (let i = 0; i < def.name.length; i++) {
            if (def.name.length > i) {
                name = name.concat(def.name[i]);
            }
            if (def.inputs.length > i) {
                if (def.inputs[i] === "owner") {
                    name = name.concat(shop.owner);
                }
                else {
                    const person = getRandomOfStringType(def.inputs[i]);
                    name = name.concat(person);
                }
            }
        }
        shop["name"] = name;
    }

    function getRandomOfStringType(catagory) {
        let value = nums[0] % 0.25 * 4;
        if (catagory === "person") {
            const index = Math.floor(PersonNames.generic_english.length * value);
            return PersonNames.generic_english[index];
        }
        else if (catagory === "plural_item") {
            const index = Math.floor(Items.plural_items.length * value);
            return capitalize(Items.plural_items[index]);
        }
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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