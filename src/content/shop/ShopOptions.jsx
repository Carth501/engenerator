import { Checkbox, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { RUN_SHOP_GENERATE, SET_SHOP_OPTIONS } from "../../redux/actionTypes";
import { SeedControls } from '../SeedControls.jsx';

export function ShopOptions() {
    const [stockGen, setStockGen] = useState(true);
    const [ownerGen, setOwnerGen] = useState(true);
    const [specialty, setSpecialty] = useState('general');

    const dispatch = useDispatch();

    useEffect(() => {
        const savedStockGen = Cookies.get("stockGen");
        setStockGen(savedStockGen === "true");

        const savedOwnerGen = Cookies.get("ownerGen");
        setOwnerGen(savedOwnerGen === "true");

        const savedSpecialty = Cookies.get("specialty");
        if (savedSpecialty) {
            setSpecialty(savedSpecialty);
        }
        else {
            setSpecialty('general');
        }
        const payload = {
            options: {
                "stockGen": savedStockGen || true,
                "ownerGen": savedOwnerGen || true,
                "specialty": savedSpecialty || 'general'
            }
        }
        dispatch({
            type: SET_SHOP_OPTIONS,
            payload
        });
    }, [dispatch]);

    function toggleStockGen(setting) {
        Cookies.set('stockGen', setting, { sameSite: 'strict' });
        setStockGen(setting);
        const payload = {
            options: {
                "stockGen": setting,
                "ownerGen": ownerGen,
                "specialty": specialty
            }
        }
        setOptions(payload);

    }

    function toggleOwnerGen(setting) {
        Cookies.set('ownerGen', setting, { sameSite: 'strict' });
        setOwnerGen(setting);
        const payload = {
            options: {
                "stockGen": stockGen,
                "ownerGen": setting,
                "specialty": specialty
            }
        }
        setOptions(payload);
    }

    function specifySpecialty(value) {
        Cookies.set('specialty', value, { sameSite: 'strict' });
        setSpecialty(value);
        const payload = {
            options: {
                "stockGen": stockGen,
                "ownerGen": ownerGen,
                "specialty": value
            }
        }
        setOptions(payload);
    };

    function setOptions(payload) {
        dispatch({
            type: SET_SHOP_OPTIONS,
            payload
        });
    }

    function reprocess() {
        dispatch({
            type: RUN_SHOP_GENERATE,
        });
    }

    return (
        <div className='left-controls'>
            <SeedControls />
            <Button
                variant="contained"
                color="secondary"
                onClick={reprocess}>
                Generate Shop
            </Button>
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