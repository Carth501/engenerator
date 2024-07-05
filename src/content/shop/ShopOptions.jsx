import { Checkbox, FormControl, FormGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { connect } from "react-redux";
import { setSeed } from '../../redux/actions';
import SeedControls from '../SeedControls.jsx';
import { useCookie } from '../useCookie.js';

export function ShopOptions() {
    const [stockGen, setStockGen, deleteStockGen] = useCookie("stockGen");

    function toggleStockGen(setting) {
        setStockGen(setting);
    }

    function toggleOwnerGen(setting) {
        console.log(document.cookie);
    }

    function setSpecialty(event) {
    };

    return (
        <div className='left-controls'>
            <SeedControls />
            <Button
                variant="contained"
                color="secondary">
                Generate Shop
            </Button>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox
                        color="secondary"
                        onChange={e => toggleStockGen(e.target.checked)}
                        checked={{ stockGen }} />}
                    label="Generate Stock" />
                <FormControlLabel
                    control={<Checkbox
                        color="secondary"
                        onChange={e => toggleOwnerGen(e.target.checked)} />}
                    label="Generate Owner's Name"
                    checked={true} />
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="specialty">Specialty</InputLabel>
                    <Select
                        labelId="specialty"
                        id="specialty-select"
                        value="general"
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