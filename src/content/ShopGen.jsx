import { Checkbox, FormGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
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

    const [results, setResults] = useState("");
    const [options, setOptions] = useState({
        "stockGen": true,
        "ownerGen": true,
        "seed": null
    });

    function generate() {
        let nums;
        if (options.seed === null || options.seed === "") {
            nums = generateUnseeded();
        }
        else {
            nums = generateSeeded(options.seed);
        }
        const shop = generateShop(nums);
        setResults(writeText(shop));
    }

    function setSeed(newSeed) {
        setOptions(options => ({ ...options, "seed": newSeed }));
    }

    function generateSeeded(seed) {
        rand = new Rand(seed);
        const shopValues = [];
        for (var i = 0; i < 4; i++) {
            shopValues.push(rand.next());
        }
        return shopValues;
    }

    function generateUnseeded() {
        const shopValues = [];
        for (var i = 0; i < 4; i++) {
            shopValues.push(Math.random());
        }
        return shopValues;
    }

    function writeText(shop) {
        let text = "";
        text += "Name: " + shop.name + "\n";
        if (shop.owner) { text += "Owner: " + shop.owner + "\n"; }
        text += "Number of Active Years: " + shop.age + "\n";
        text += "Hours: Dawn to Dusk\n";
        text += "Employees: " + Math.round(shop.employees.count) + "\n";
        if (shop.stock) {
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
                const adjust = shop.stock[items[i]].priceAdjustment;
                const price = shop.stock[items[i]].price * adjust;
                line += " @ " + price.toFixed(3);
                const percent = (shop.stock[items[i]].priceAdjustment - 1) * 100;
                line += " (" + (percent).toFixed(1) + "%)";
                line += "\n";
                text += line;
            }
        }
        return text;
    }

    function generateShop(nums) {
        const shop = {};
        if (options.ownerGen) {
            shop["owner"] = getRandomOfStringType("person", (nums[0] % 0.125 * 8));
        }
        if (nums[0] > 0.4 || (!shop.owner && nums[0] > 0.1)) {
            getGenericName(shop, nums);
        }
        else {
            getSpecificName(shop, nums);
        }
        shop["age"] = ageTransform(nums[0], 10, 30);
        shop["employees"] = { "count": nums[1] * 5 };
        if (options.stockGen) {
            getStock(shop, nums);
        }
        return shop;
    }

    function getGenericName(shop, nums) {
        let value = nums[0] % 0.4 * 2.5;
        let nameIndex = Math.floor(ShopNames.generic_names.length * value);
        shop["name"] = ShopNames.generic_names[nameIndex];
    }

    function getSpecificName(shop, nums) {
        let value = nums[0] % 0.5 * 2;
        if (value > 0.2 && shop.owner) {
            getNamedAfterPerson(shop, nums);
        }
        else {
            getNamedAfterItem(shop, nums);
        }
    }

    function getNamedAfterItem(shop, nums) {
        const def = ShopNames.specific_names.named_after_item;
        let name = "";
        for (let i = 0; i < def.name.length; i++) {
            if (def.name.length > i) {
                name = name.concat(def.name[i]);
            }
            if (def.inputs.length > i) {
                name = name.concat(getRandomOfStringType(def.inputs[i], nums));
            }
        }
        shop["name"] = name;
    }

    function getNamedAfterPerson(shop, nums) {
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
                    const person = getRandomOfStringType(def.inputs[i], nums);
                    name = name.concat(person);
                }
            }
        }
        shop["name"] = name;
    }

    function getRandomOfStringType(catagory, nums, random = 0) {
        let value = nums[0] % 0.25 * 4;
        if (catagory === "person") {
            const randomValue = PersonNames.generic_english.length * value;
            const index = Math.floor(randomValue);
            return PersonNames.generic_english[index];
        }
        else if (catagory === "plural_item") {
            const randomValue = Object.keys(Items).length * value;
            const subcatagoryIndex = Math.floor(randomValue);
            const key = Object.keys(Items)[subcatagoryIndex];
            const list = Items[key];
            let itemIndex = Math.floor(random * Object.keys(list).length);
            const itemKey = Object.keys(list)[itemIndex]
            return list[itemKey].plural;
        }
    }

    function getStock(shop, nums) {
        let value = nums[1];
        const itemCount = Math.round(15 + value * 30);
        shop["stock"] = {};
        for (var i = 0; i < itemCount; i++) {
            const rand1 = nums[1] % (1 / (i + 2)) * (i + 2);
            const rand2 = rand1 % (1 / (i + 3)) * (i + 3);
            const rand3 = rand1 % (1 / (i + 4)) * (i + 4);
            const rand4 = rand1 % (1 / (i + 5)) * (i + 5);
            const list = randItemCategory(rand1);
            const itemKey = randItemKeyFrom(list, rand2);
            const item = cloneDeep(list[itemKey]);
            if (shop["stock"][itemKey] === undefined) {
                shop["stock"][itemKey] = item;
                const randomStockDelta = item.variance * gaussianRandom(rand3);
                const newStock = Math.abs(item.stock + Math.ceil(randomStockDelta));
                shop["stock"][itemKey].stock = newStock;
                const priceRand = 0.15 * gaussianRandom(rand4) + 1;
                const priceAdjustment = Math.max(priceRand, 0.1);
                shop["stock"][itemKey].priceAdjustment = priceAdjustment;
            }
            else {
                const randomStockDelta = item.variance * gaussianRandom(rand3);
                const value = item.stock + Math.ceil(randomStockDelta);
                const additionalStock = Math.abs(value);
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

    function randItemKeyFrom(list, random) {
        let totalCommonness = 0;
        for (let i = 0; i < Object.keys(list).length; i++) {
            totalCommonness += 1 / list[Object.keys(list)[i]].rarity
        }
        let roll = random * totalCommonness;
        for (let i = 0; i < Object.keys(list).length; i++) {
            roll -= 1 / list[Object.keys(list)[i]].rarity;
            if (roll <= 0) {
                return Object.keys(list)[i];
            }
        }
    }

    function toggleStockGen(setting) {
        setOptions(options => ({ ...options, "stockGen": setting }));
    }

    function toggleOwnerGen(setting) {
        setOptions(options => ({ ...options, "ownerGen": setting }));
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
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            color="secondary"
                            onChange={e => toggleStockGen(e.target.checked)} />}
                        label="Generate Stock"
                        checked={options.stockGen} />
                    <FormControlLabel
                        control={<Checkbox
                            color="secondary"
                            onChange={e => toggleOwnerGen(e.target.checked)} />}
                        label="Generate Owner's Name"
                        checked={options.ownerGen} />
                </FormGroup>
            </div>
            <div className='right-display'>
                {results}
            </div>
        </div>
    )
}

export default ShopGen;