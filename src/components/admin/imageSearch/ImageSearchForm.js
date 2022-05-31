import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Alert } from "@mui/material";
import React from "react";
import { Spinner } from "react-bootstrap";
import { updateConfigFileWithKey, } from "../../../services/azureBlobController";
import { createAzureImageSearchClient } from "../../../services/azureSearchImageController";


export default class ImageSearchForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            updateConfig: true,
            loading: false,
            appName: props.appName,
            response: {
                msg: '',
                show: false,
                variant: ''
            },
        }
        this.resourceConfig = {
            containerName: '',
            blobFolder: '',
        }
        this.formName = 'imageBlob'
        this.imageConfig = {
            "searchHost": `https://bcs-image-search.search.windows.net/indexes/${this.state.appName}/docs`,
            "searchApiVersion": '2020-06-30',
            "searchApiKey": process.env.REACT_APP_QUERY_KEY_GSA_IMAGE_SEARCH,
            "sasKey": ''

        }
    }

    doContainerOrFolderExists = () => {
        //TODO:
    }

    setLoading = (bool) => {
        this.setState((prevState) => (
            {
                ...prevState,
                loading: bool
            }))
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setLoading(true)

        createAzureImageSearchClient(this.state.appName,
            this.resourceConfig.containerName, this.resourceConfig.blobFolder)
            .then(result => {

                if (this.state.updateConfig) {
                    updateConfigFileWithKey(this.imageConfig, this.state.appName, this.formName)
                }
                this.setLoading(false)
                this.setState((prevState) => (
                    {
                        ...prevState,
                        response: {
                            msg: `Image search is created for app : ${this.state.appName}`,
                            show: true,
                            variant: 'success'
                        }
                    }))
            }
            )
            .catch(err => {
                this.setLoading(false)
                console.log('not finished')
                this.setState((prevState) => (
                    {
                        ...prevState,
                        response: {
                            msg: 'Image search is not created',
                            show: true,
                            variant: 'error'
                        }
                    }))
            })
    }

    handleChangeResourceConfig = (e) => {

        this.resourceConfig = {
            ...this.resourceConfig,
            [e.target.name]: e.target.value
        }
    }

    handleChangeImageConfig = (e) => {
        this.imageConfig = {
            ...this.handleChangeImageConfig,
            [e.target.name]: e.target.value
        }
    }

    updateConfig = () => {
        this.setState((prevState) => (
            {
                ...prevState,
                updateConfig: !prevState.updateConfig
            }))
    }

    render() {

        return <>

            {this.state.loading ?
                <Spinner animation="grow" size='lg' />
                :
                <form onSubmit={this.handleSubmit}>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <h3 style={{ paddingBottom: 10 }}>Image Search Form</h3>
                        {this.state.response.show &&
                            <Alert severity={this.state.response.variant} >
                                {this.state.response.msg}
                            </Alert>}
                        {!this.state.response.show &&
                            <>
                                <Grid container spacing={3} mt={1} mb={3} direction="column"
                                    justifyContent="center"
                                    alignItems="center">

                                    <Grid item sm={12} md={3}>
                                        <TextField
                                            name="containerName"
                                            onChange={this.handleChangeResourceConfig}
                                            label="Container name"
                                            type="text"
                                            variant="filled"
                                            size="small"
                                            required
                                        />
                                    </Grid>

                                    <Grid item sm={12} md={3}>
                                        <TextField
                                            name="blobFolder"
                                            onChange={this.handleChangeResourceConfig}
                                            label="Blob folder"
                                            type="text"
                                            variant="filled"
                                            size="small"
                                            helperText="*ends up with (/) "
                                        />
                                    </Grid>

                                    <Grid item sm={12} md={3}>
                                        <TextField
                                            name="sasKey"
                                            onChange={this.handleChangeImageConfig}
                                            label="sasKey"
                                            type="text"
                                            variant="filled"
                                            size="small"
                                            helperText='*starts with (?)'
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox defaultChecked onChange={this.updateConfig} id='config-checkbox' />}
                                        label="Add image search to config.json" />
                                </FormGroup>
                            </>
                        }
                        <Button type="button" onClick={this.props.resetCurrentComponent}>Back</Button>
                        {!this.state.response.show && <Button type="submit" variant="contained">Submit</Button>}
                    </div>
                </form>
            }


        </>
    }
}