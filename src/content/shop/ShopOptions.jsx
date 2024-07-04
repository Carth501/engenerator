import { Checkbox, FormControl, FormGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { connect } from "react-redux";
import { setSeed } from '../../redux/actions';

export function ShopOptions() {
    const [options, setOptions] = useState({});

    function toggleStockGen(setting) {
        console.log(setting);
    }

    function toggleOwnerGen(setting) {
        console.log(setting);
    }

    function setSpecialty(event) {
        console.log(event);
    };

    return (
        <div className='left-controls'>
            <Button
                variant="contained"
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
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="specialty">Specialty</InputLabel>
                    <Select
                        labelId="specialty"
                        id="specialty-select"
                        value={options.specialty}
                        onChange={e => setSpecialty(e.target.value)}
                        color="secondary"
                    >
                        <MenuItem value={'general'}>General Store</MenuItem>
                        <MenuItem value={'livestock'}>Livestock</MenuItem>
                        <MenuItem value={'construction'}>Construction</MenuItem>
                    </Select>
                </FormControl>
            </FormGroup>
        </div>
    )
}

export default connect(
    null,
    { setSeed }
)(ShopOptions);