import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import dice from '../images/casino_dice.svg';
import { getOptions } from '../redux/selectors';
import './SeedControls.css';

export const SeedControls = () => {
    const [seedString, setSeedString] = useState('')
    const options = useSelector(
        getOptions
    )

    const dispatch = useDispatch();

    function randomSeed() {
        const newSeed = Math.floor(Math.random() * 4294967296).toString();
        updateInput(newSeed);
    }

    function updateInput(input) {
        setSeedString(input);
        dispatch({
            type: 'RUN_SHOP_GENERATE',
            payload: {
                rootSeed: input,
                options
            }
        });
    };

    return (
        <div className='seed-controls'>
            <Button
                color='secondary'
                className='random-seed-button'
                onClick={e => randomSeed()}>
                <img src={dice} alt="randomize seed" className='dice-icon' />
            </Button>
            <Input
                type="text"
                id="seed"
                placeholder='seed'
                value={seedString}
                onChange={e => updateInput(e.target.value)} />
        </div>
    )
}