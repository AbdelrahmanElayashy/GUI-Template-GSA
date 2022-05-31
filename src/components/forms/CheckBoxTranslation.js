import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { Form } from 'react-bootstrap'
export class CheckBoxTranslation extends React.Component {
    constructor(props) {
        super(props);

        this.state = { checked: false, fieldName: "", en: "", de: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {

        this.setState({
            checked: !this.state.checked,
        })
    }

    handleChangeField = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state)
        if (this.state.checked) {
            const inputUser = {
                [this.props.field]: `${this.state.fieldName}`,
                "translationId": `${this.state.fieldName}`
            }
            const en = { [this.state.fieldName]: this.state.en }
            const de = { [this.state.fieldName]: this.state.de }

            this.props.state[this.props.index] = inputUser
            this.props.en[this.props.index] = en
            this.props.de[this.props.index] = de
        } else {
            try {
                this.props.state.splice(this.props.index, 1)
                this.props.en.splice(this.props.index, 1)
                this.props.de.splice(this.props.index, 1)
            }
            catch (e) {
                console.log('index error!')
            }
        }
    }

    render() {
        const content = this.state.checked
            ?
            <Grid container spacing={3}>
                <Grid item>
                    <TextField label="Name" variant="filled"
                        name="fieldName"
                        onChange={this.handleChangeField}
                        required
                        helperText='Name should be same as in csv!' />
                </Grid>
                <Grid item>
                    <TextField label="Translation EN" variant="filled"
                        name="en"
                        onChange={this.handleChangeField}
                        required />
                </Grid>
                <Grid item>
                    <TextField label="Translation DE" variant="filled"
                        name="de"
                        onChange={this.handleChangeField}
                        required />
                </Grid>
            </Grid>

            : null;

        return (

            <Form.Group>
                <FormControlLabel
                    label={this.props.label}
                    control={<Checkbox size="small" onChange={this.handleChange} color="primary" />}
                />
                {content}
            </Form.Group>
        )
    }
}





