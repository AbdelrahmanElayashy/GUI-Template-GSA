import React from "react";
import { Spinner } from 'react-bootstrap'
import { Alert, Button, Grid, TextField } from "@mui/material";
import { updateConfigFileWithKey } from "../../../services/azureBlobController";


export default class PiplineIDForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            appName: props.appName,
            loading: false,
            response: {
                msg: '',
                show: false,
                variant: ''
            }
        }
        this.formName = 'imageRecognationService'
        this.config = {
            "authKey": process.env.REACT_APP_GSA_AUTH_KEY,
            "pipelineId": ""
        }

    }

    handleSubmit = (event) => {

        event.preventDefault();
        this.setLoading(true)
        updateConfigFileWithKey(this.config, this.state.appName, this.formName)
            .then(res => {
                this.setLoading(false)
                this.setState((prevState) => (
                    {
                        ...prevState,
                        response: {
                            msg: `Pipline Id and AuthKey are added for : ${this.state.appName}`,
                            show: true,
                            variant: 'success'
                        }
                    }))

            }
            )
            .catch(err => {
                this.setLoading(false)
                this.setState((prevState) => (
                    {
                        ...prevState,
                        mapCsvColumn: false,
                        response: {
                            msg: 'Pipline Id and AuthKey are not added',
                            show: true,
                            variant: 'error'
                        }
                    }))
            }
            )

    }

    setLoading = (bool) => {
        this.setState((prevState) => (
            {
                ...prevState,
                loading: bool
            }))
    }

    updatePiplineId = (e) => {
        this.config['pipelineId'] = e.target.value
    }


    render() {


        return (

            this.state.loading ?
                <Spinner animation="grow" size='lg' />
                :
                <form onSubmit={this.handleSubmit} >
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <h3 style={{ paddingBottom: 10 }}>PiplineId Form</h3>
                        {this.state.response.show &&
                            <Alert severity={this.state.response.variant} >
                                {this.state.response.msg}
                            </Alert>}
                        {!this.state.response.show &&
                            <Grid container spacing={3} mt={1} mb={3} direction="column"
                                justifyContent="center"
                                alignItems="center">

                                <Grid item sm={12} md={3}>
                                    <TextField
                                        name=""
                                        onChange={this.updatePiplineId}
                                        label="Pipline ID"
                                        type="text"
                                        variant="filled"
                                        size="small"
                                        required
                                    />
                                </Grid>
                            </Grid>
                        }
                        <br />
                        <Button type="button" onClick={this.props.resetCurrentComponent}>Back</Button>
                        <Button type="submit" variant="contained">Submit</Button>

                    </div>


                </form >




        )

    }

}