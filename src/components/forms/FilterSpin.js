import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@material-ui/core';

export class FilterSpin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            '0': false,
            '45': false,
            '90': false,
            '135': false,
            '180': false,
            '225': false
        };

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name],
        })

    }

    handleChangeParent = (e, isInputChecked) => {

        const newState = Object.keys(this.state).map(key => { return { [key]: isInputChecked } })
            .reduce((sum, item) => { return { ...sum, ...item } }, {})
        this.setState(newState)
    }

    componentDidUpdate(prevProps, prevState) {

        this.props.state[0] = " ( " + Object.keys(this.state).filter(i => this.state[i]).map(
            i => `SpinAngle eq ${i}`).join(' or ') + " ) "


    }

    render() {

        const children = (
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3, flexWrap: 'wrap' }}>
                {
                    Object.keys(this.state).map(key => {
                        return (
                            <FormControlLabel
                                label={`${key}`}
                                key={key}
                                control={<Checkbox size="small" checked={this.state[key]} name={`${key}`} onChange={this.handleChange} color="primary" />}
                            />
                        )
                    })
                }
            </Box>
        );

        return (

            <div>
                <FormControlLabel
                    label={<Typography variant="overline" display="block" gutterBottom>
                        Spin angle
                    </Typography>}
                    control={
                        <Checkbox
                            checked={Object.keys(this.state).map(i => this.state[i])
                                .reduce((sum, item) => sum && item, true)}
                            onChange={this.handleChangeParent}
                            color="primary"
                        />
                    }
                />
                {children}
            </div>
        )
    }
}

