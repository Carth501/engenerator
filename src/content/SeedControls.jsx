import Input from '@mui/material/Input';
import React from "react";
import { connect } from "react-redux";
import { setSeed } from '../redux/actions';

class SeedControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    updateInput = input => {
        this.props.setSeed(input);
    };

    render() {
        return (
            <Input
                type="text"
                id="seed"
                placeholder='seed'
                onChange={e => this.updateInput(e.target.value)} />
        )
    }
}

export default connect(
    null,
    { setSeed }
)(SeedControls);

