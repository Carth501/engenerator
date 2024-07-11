
import cloneDeep from 'lodash.clonedeep';
import Items from '../content/Items.json';
import ShopNames from '../content/ShopNames.json';
import Specialties from '../content/Specialties.json';
import { ageTransform, gaussianRandom } from '../content/Tools.js';
import { getRandomOfStringType } from './commonFunctions.js';

export function generateShop(nums, options) {
    const shop = {};
    if (options.ownerGen) {
        shop["owner"] = getRandomOfStringType("person", nums[0]);
    }
    if (nums[0] > 0.4 || (!shop.owner && nums[0] > 0.1)) {
        shop["name"] = getGenericName(nums);
    }
    else {
        shop["name"] = getSpecificName(nums, shop.owner);
    }
    shop["age"] = ageTransform(nums[0], 10, 30);
    shop["employees"] = { "count": nums[1] * 5 };
    if (options.stockGen) {
        shop["stock"] = getStock(nums, options);
    }
    return shop;
}

function getGenericName(nums) {
    let value = nums[0] % 0.4 * 2.5;
    let nameIndex = Math.floor(ShopNames.generic_names.length * value);
    return ShopNames.generic_names[nameIndex];
}

function getSpecificName(nums, owner) {
    let value = nums[0] % 0.5 * 2;
    if (value > 0.2 && !!owner) {
        return getNamedAfterPerson(nums, owner);
    }
    else {
        return getNamedAfterItem(nums);
    }
}

function getNamedAfterItem(nums) {
    const def = ShopNames.specific_names.named_after_item;
    let name = "";
    for (let i = 0; i < def.name.length; i++) {
        if (def.name.length > i) {
            name = name.concat(def.name[i]);
        }
        if (def.inputs.length > i) {
            name = name.concat(getRandomOfStringType(def.inputs[i], nums[0]));
        }
    }
    return name;
}

function getNamedAfterPerson(nums, owner) {
    const def = ShopNames.specific_names.named_after_person;
    let name = "";
    for (let i = 0; i < def.name.length; i++) {
        if (def.name.length > i) {
            name = name.concat(def.name[i]);
        }
        if (def.inputs.length > i) {
            if (def.inputs[i] === "owner") {
                name = name.concat(owner);
            }
            else {
                const person = getRandomOfStringType(def.inputs[i], nums[0]);
                name = name.concat(person);
            }
        }
    }
    return name;
}

function getStock(nums, options) {
    let value = nums[1];
    const itemCount = Math.round(5 + value * 45);
    const temp_shop = {};
    for (var i = 0; i < itemCount; i++) {
        const rand1 = nums[1] % (1 / (i + 2)) * (i + 2);
        const rand2 = rand1 % (1 / (i + 3)) * (i + 3);
        const rand3 = rand1 % (1 / (i + 4)) * (i + 4);
        const rand4 = rand1 % (1 / (i + 5)) * (i + 5);
        const rand5 = rand1 % (1 / (i + 6)) * (i + 6);
        let list;
        if (options.specialty === 'any-specialty') {
            const rand_specialty = rand2 % (1 / (i + 3)) * (i + 3);
            if (rand_specialty < 0.2) {
                console.log('general specialty item');
                list = randItemCategory(rand1, 'general');
            } else {
                const specialty_keys = Object.keys(Specialties);
                const specialty = specialty_keys[Math.floor(specialty_keys.length * rand2)];
                list = randItemCategory(rand1, specialty);
            }
        } else {
            list = randItemCategory(rand1, options.specialty);
        }
        const itemKey = randItemKeyFrom(list, rand3);
        const item = cloneDeep(list[itemKey]);
        if (temp_shop[itemKey] === undefined) {
            temp_shop[itemKey] = item;
            const randomStockDelta = item.variance * gaussianRandom(rand4);
            const newStock = Math.abs(item.stock + Math.ceil(randomStockDelta));
            temp_shop[itemKey].stock = newStock;
            const priceRand = 0.15 * gaussianRandom(rand5) + 1;
            const priceAdjustment = Math.max(priceRand, 0.1);
            temp_shop[itemKey].priceAdjustment = priceAdjustment;
        }
        else {
            const randomStockDelta = item.variance * gaussianRandom(rand4);
            const value = item.stock + Math.ceil(randomStockDelta);
            const additionalStock = Math.abs(value);
            temp_shop[itemKey].stock += additionalStock;
        }
    }
    return temp_shop;
}

function randItemCategory(randomValue, specialty_index) {
    const categoryRatios = Specialties[specialty_index];
    let value = ratioSum(categoryRatios) * randomValue;
    const keys = Object.keys(categoryRatios);
    let index = 0;
    while (value > categoryRatios[keys[index]]) {
        value -= categoryRatios[keys[index]];
        index++;
    }
    return Items[keys[index]];
}

function ratioSum(specialty) {
    let total = 0;
    const keys = Object.keys(specialty);
    for (let i = 0; i < keys.length; i++) {
        total += specialty[keys[i]];
    }
    return total;
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