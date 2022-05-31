import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import * as React from 'react';

export class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'copyToClipboard': { value: false, backgroundColor: '#1976d2', color: '#FFFFFF' },
            'sendMail': { value: false, backgroundColor: '#1976d2', color: '#FFFFFF' },
            'sendFeedback': { value: false, backgroundColor: '#1976d2', color: '#FFFFFF' }
        };


    }

    handleChange = (e) => {

        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: {
                value: !this.state[e.target.name].value,
                backgroundColor: prevState[e.target.name].backgroundColor,
                color: prevState[e.target.name].color
            },

        }))
    }

    handleChangeParent = (e, isChecked) => {
        const newState = Object.keys(this.state).map(key => { return { [key]: { ...this.state[key], value: isChecked } } })
            .reduce((sum, item) => { return { ...sum, ...item } }, {})

        this.setState(newState)
    }

    handleChangeAttr = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.getAttribute('action')]: {
                ...prevState[e.target.getAttribute('action')], [e.target.name]: e.target.value
            }
        }))
    }

    componentDidUpdate(prevProps, prevState) {

        let actions = JSON.parse(JSON.stringify(this.state))
        for (const key in this.state) {
            if (!this.state[key].value) {
                delete actions[key]
                continue
            }
            delete actions[key].value
        }
        console.log(actions)
        this.props.state[0] = JSON.parse(JSON.stringify(actions))
    }

    render() {
        const actionAttr = (paction) => {
            return (
                <Grid container style={{ width: '70%', marginLeft: 32 }}>
                    <Grid item xs={6} sm={6} md={6}>

                        <Typography variant="overline" display="block" gutterBottom>
                            Text-Color
                        </Typography>

                        <input type="color" className="ColorInput"
                            name='backgroundColor'
                            action={paction}
                            onChange={this.handleChangeAttr}
                            value={this.state[paction].backgroundColor} />

                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>

                        <Typography variant="overline" display="block" gutterBottom>
                            Image-Color
                        </Typography>

                        <input type="color" className="ColorInput"
                            name='color'
                            action={paction}
                            onChange={this.handleChangeAttr}
                            value={this.state[paction].color} />

                    </Grid>

                </Grid>
            )
        }

        return (
            <div className=''>
                <FormControlLabel
                    label={<Typography variant="overline" display="block" gutterBottom>
                        Actions
                    </Typography>}
                    control={
                        <Checkbox
                            checked={Object.keys(this.state).map(i => this.state[i].value)
                                .reduce((sum, item) => sum && item, true)}
                            onChange={this.handleChangeParent}
                            color="primary"
                        />
                    }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                        label="Copy to clipboard"
                        control={<Checkbox size="small" checked={this.state['copyToClipboard'].value} name="copyToClipboard" onChange={this.handleChange} color="primary" />}
                    />
                    {this.state['copyToClipboard'].value ? actionAttr('copyToClipboard') : null}
                    <FormControlLabel
                        label="Send mail"
                        control={<Checkbox size="small" checked={this.state['sendMail'].value} name="sendMail" onChange={this.handleChange} color="primary" />}
                    />
                    {this.state['sendMail'].value ? actionAttr('sendMail') : null}

                    <FormControlLabel
                        label="Send feedback"
                        control={<Checkbox size="small" checked={this.state['sendFeedback'].value} name="sendFeedback" onChange={this.handleChange} color="primary" />}
                    />
                    {this.state['sendFeedback'].value ? actionAttr('sendFeedback') : null}

                </Box>
            </div>
        )
    }
}



