import { Checkbox, FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RUN_SHOP_GENERATE } from "../../redux/actionTypes";
import { getRootSeed, shopCookieProcessed } from "../../redux/selectors";

export function ShopOptions() {
    const [stockGen, setStockGen] = useState(true);
    const [ownerGen, setOwnerGen] = useState(true);
    const [specialty, setSpecialty] = useState('general');
    const cookieProcessed = useSelector(
        shopCookieProcessed
    )
    const rootSeed = useSelector(
        getRootSeed
    )

    const dispatch = useDispatch();

    useEffect(() => {
        const savedStockGen = Cookies.get("stockGen") === "true";
        setStockGen(savedStockGen);

        const savedOwnerGen = Cookies.get("ownerGen") === "true";
        setOwnerGen(savedOwnerGen);

        const savedSpecialty = Cookies.get("specialty");
        if (savedSpecialty) {
            setSpecialty(savedSpecialty);
        }
        else {
            setSpecialty('general');
        }
        if (!cookieProcessed) {
            const payload = {
                rootSeed,
                options: {
                    stockGen: savedStockGen || true,
                    ownerGen: savedOwnerGen || true,
                    specialty: savedSpecialty || 'general',
                    shopCookieProcessed: true
                }
            }
            dispatch({
                type: RUN_SHOP_GENERATE,
                payload
            });
        }
    }, [dispatch, rootSeed, cookieProcessed]);

    function toggleStockGen(setting) {
        Cookies.set('stockGen', setting, { sameSite: 'strict' });
        setStockGen(setting);
        const payload = {
            rootSeed,
            options: {
                stockGen: setting,
                ownerGen: ownerGen,
                specialty: specialty,
                shopCookieProcessed: cookieProcessed
            }
        }
        setOptions(payload);

    }

    function toggleOwnerGen(setting) {
        Cookies.set('ownerGen', setting, { sameSite: 'strict' });
        setOwnerGen(setting);
        const payload = {
            rootSeed,
            options: {
                stockGen: stockGen,
                ownerGen: setting,
                specialty: specialty,
                shopCookieProcessed: cookieProcessed
            }
        }
        setOptions(payload);
    }

    function specifySpecialty(value) {
        Cookies.set('specialty', value, { sameSite: 'strict' });
        setSpecialty(value);
        const payload = {
            rootSeed,
            options: {
                stockGen: stockGen,
                ownerGen: ownerGen,
                specialty: value,
                shopCookieProcessed: cookieProcessed
            }
        }
        setOptions(payload);
    };

    function setOptions(payload) {
        dispatch({
            type: RUN_SHOP_GENERATE,
            payload
        });
    }

    return (
        <div className='left-controls'>
            <form className='options-list'>
                <label>
                    <Checkbox
                        color="secondary"
                        onChange={e => toggleStockGen(e.target.checked)}
                        value={stockGen}
                        checked={stockGen} />
                    Generate Stock
                </label>
                <label>
                    <Checkbox
                        color="secondary"
                        onChange={e => toggleOwnerGen(e.target.checked)}
                        value={ownerGen}
                        checked={ownerGen} />
                    Generate Owner's Name
                </label>
                <FormControl size="small">
                    <Select
                        labelId="specialty"
                        id="specialty-select"
                        value={specialty}
                        onChange={e => specifySpecialty(e.target.value)}
                        color="secondary"
                    >
                        <MenuItem value={'any-specialty'}>Any Specialty</MenuItem>
                        <MenuItem value={'general'}>General Store</MenuItem>
                        <MenuItem value={'livestock'}>Livestock</MenuItem>
                        <MenuItem value={'construction'}>Construction</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </div>
    )
}