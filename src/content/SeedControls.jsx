import Input from '@mui/material/Input';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getOptions } from '../redux/selectors';

export const SeedControls = () => {
    const options = useSelector(
        getOptions
    )

    const dispatch = useDispatch();

    function updateInput(input) {
        dispatch({
            type: 'RUN_SHOP_GENERATE',
            payload: {
                rootSeed: input,
                options
            }
        });
    };

    return (
        <Input
            type="text"
            id="seed"
            placeholder='seed'
            onChange={e => updateInput(e.target.value)} />
    )
}