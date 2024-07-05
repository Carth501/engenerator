import Input from '@mui/material/Input';
import React from "react";
import { useDispatch } from 'react-redux';

export const SeedControls = () => {
    const dispatch = useDispatch();

    function updateInput(input) {
        dispatch({
            type: 'SET_ROOT_SEED',
            payload: {
                rootSeed: input
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