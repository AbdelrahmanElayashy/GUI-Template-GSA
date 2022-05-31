import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
export class FilterMore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'ElevationAngle': 60,
            'CameraNumber': 1,
            'LightId': 33,
            checked: false
        };

    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })

    }

    handleShow = (e, isChecked) => {
        this.setState({
            ...this.state,
            checked: isChecked
        })
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate(prevProps, prevState) {

        console.log(this.state)
        this.props.state[0] = `ElevationAngle eq ${this.state.ElevationAngle} and CameraNumber eq '${this.state.CameraNumber}' and (LightId eq '${this.state.LightId}')`
    }

    render() {
        return (

            <div className='pb-2'>
                <FormControlLabel
                    label={<Typography variant="overline" display="block" gutterBottom>
                        Filter more
                    </Typography>}
                    control={
                        <Checkbox
                            checked={this.state.checked}
                            color="primary"
                            onChange={this.handleShow}
                        />
                    }
                />
                {this.state.checked ?

                    <Grid container spacing={3} mt={1} mb={3}>

                        <Grid item>
                            <TextField
                                name="CameraNumber"
                                value={this.state.CameraNumber}
                                onChange={this.handleChange}
                                label="Camera Number"
                                type="number"
                                variant="filled"
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="ElevationAngle"
                                value={this.state.ElevationAngle}
                                onChange={this.handleChange}
                                label="Elevation Angle"
                                type="number"
                                variant="filled"
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="LightId"
                                value={this.state.LightId}
                                onChange={this.handleChange}
                                label="Light Id"
                                type="number"
                                variant="filled"
                                size="small"
                                required
                            />
                        </Grid>
                    </Grid>
                    :
                    null}
            </div>
        )
    }
}


