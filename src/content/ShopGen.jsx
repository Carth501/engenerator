import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import cloneDeep from 'lodash.clonedeep';
import Rand from 'rand-seed';
import { useState } from 'react';
import Items from './Items.json';
import PersonNames from './PersonNames.json';
import './ShopGen.css';
import ShopNames from './ShopNames.json';
import { ageTransform, gaussianRandom } from './Tools.js';

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
        text += "Owner: " + shop.owner + "\n";
        text += "Number of Active Years: " + shop.age + "\n";
        text += "Stock:\t";
        const items = Object.keys(shop.stock);
        const itemCount = items.length;
        for (var i = 0; i < itemCount; i++) {
            let line = "";
            if (i > 0) {
                line += "\t\t";
            }
            const number = shop.stock[items[i]].stock;
            line += number + " ";
            if (number === 1) {
                line += shop.stock[items[i]].singular;
            }
            else {
                line += shop.stock[items[i]].plural;
            }
            const price = shop.stock[items[i]].price * shop.stock[items[i]].priceAdjustment;
            line += " @ " + price.toFixed(3);
            line += " (" + ((shop.stock[items[i]].priceAdjustment - 1) * 100).toFixed(1) + "%)";
            line += "\n";
            text += line;
        }
        return text;
    }

    function generateShop() {
        const shop = {};
        shop["owner"] = getRandomOfStringType("person", (nums[0] % 0.125 * 8))
        if (nums[0] > 0.4) {
            getGenericName(shop);
        }
        else {
            getSpecificName(shop);
        }
        shop["age"] = ageTransform(nums[0], 10, 30)
        getStock(shop);
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

    function getRandomOfStringType(catagory, random = 0) {
        let value = nums[0] % 0.25 * 4;
        if (catagory === "person") {
            const randomValue = PersonNames.generic_english.length * value;
            const index = Math.floor(randomValue);
            return PersonNames.generic_english[index];
        }
        else if (catagory === "plural_item") {
            const randomValue = Object.keys(Items).length * value;
            console.log(value);
            const subcatagoryIndex = Math.floor(randomValue);
            const key = Object.keys(Items)[subcatagoryIndex];
            const list = Items[key];
            let itemIndex = Math.floor(random * list.length);
            return list[itemIndex].plural;
        }
    }

    function getStock(shop) {
        let value = nums[1];
        const itemCount = Math.round(15 + value * 20);
        shop["stock"] = {};
        for (var i = 0; i < itemCount; i++) {
            const rand1 = nums[1] % (1 / (i + 2)) * (i + 2);
            const rand2 = rand1 % (1 / (i + 3)) * (i + 3);
            const rand3 = rand1 % (1 / (i + 4)) * (i + 4);
            const rand4 = rand1 % (1 / (i + 5)) * (i + 5);
            const list = randItemCategory(rand1);
            const index = Math.floor(rand2 * Object.keys(list).length);
            const itemKey = Object.keys(list)[index];
            const item = cloneDeep(list[itemKey]);
            if (shop["stock"][itemKey] === undefined) {
                shop["stock"][itemKey] = item;
                const randomStockDelta = item.variance * gaussianRandom(rand3);
                const newStock = Math.abs(item.stock + Math.ceil(randomStockDelta));
                shop["stock"][itemKey].stock = newStock;
                const priceAdjustment = Math.max(0.15 * gaussianRandom(rand4) + 1, 0.1);
                shop["stock"][itemKey].priceAdjustment = priceAdjustment;
            }
            else {
                const randomStockDelta = item.variance * gaussianRandom(rand3);
                const additionalStock = Math.abs(item.stock + Math.ceil(randomStockDelta));
                shop["stock"][itemKey].stock += additionalStock;
            }
        }
    }

    function randItemCategory(randomValue) {
        const value = Object.keys(Items).length * randomValue;
        const subcatagoryIndex = Math.floor(value);
        const key = Object.keys(Items)[subcatagoryIndex];
        return Items[key];
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