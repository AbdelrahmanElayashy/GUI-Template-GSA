import React from "react";
import { Form, Spinner } from 'react-bootstrap'
import CSVImportGetHeaders from "../../../services/Csv";
import { createAzureSearchClient } from '../../../services/azureSearchTextController'
import { updateConfigFileWithKey } from "../../../services/azureBlobController";
import { Alert, Button, Checkbox, Chip, FormControlLabel, FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

export default class GsaSearchForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            appName: props.appName,
            mapCsvColumn: false,
            headers: [],
            csvFile: null,
            loading: false,
            response: {
                msg: '',
                show: false,
                variant: ''
            },
            updateConfig: true
        }
        this.formName = 'search'
        this.searchConfig = {
            "searchHost": process.env.REACT_APP_GSA_SEARCH_HOST,
            "searchIndex": "",
            "searchApiKey": process.env.REACT_APP_QUERY_KEY_GSA_TEXT_SEARCH,
            "searchThumbnailBasePath": "",
            "queryParameters": {
                "fuzzy": "false",
                "queryType": "full",
                "count": "false",
                "searchMode": "all",
                "select": "",
                "searchFields": ""
            }

        }
    }

    handleSubmit = (event) => {

        event.preventDefault();

        if (this.state.headers.length === 0) return

        this.setLoading(true)
        createAzureSearchClient(this.state.appName, this.state.headers, this.state.csvFile)
            .then(result => {
                console.log('Finished')
                this.setLoading(false)
                console.log(result, 'return form azure search client')

                if (this.state.updateConfig) {
                    this.searchConfig.searchIndex = result
                    this.searchConfig.queryParameters.select = this.state.headers.map(i => { return i.name }).join(',')
                    this.searchConfig.queryParameters.searchFields = this.searchConfig.queryParameters.select
                    updateConfigFileWithKey(this.searchConfig, this.state.appName, this.formName)
                }
                this.setState((prevState) => (
                    {
                        ...prevState,
                        mapCsvColumn: false,
                        response: {
                            msg: `Text search is created for app : ${this.state.appName}`,
                            show: true,
                            variant: 'success'
                        }
                    }))

            })
            .catch(err => {
                console.log('not finished!!!')
                console.log(err)
                this.setLoading(false)
                this.setState((prevState) => (
                    {
                        ...prevState,
                        mapCsvColumn: false,
                        response: {
                            msg: 'Text search is not created',
                            show: true,
                            variant: 'error'
                        }
                    }))
            })
    }

    setLoading = (bool) => {
        this.setState((prevState) => (
            {
                ...prevState,
                loading: bool
            }))
    }

    handleHeaderChange = (event, index) => {
        let newHeader = this.state.headers
        newHeader[index].name = event.target.value
        this.setState((prevState) => (
            {
                ...prevState,
                headers: newHeader
            }))
    }

    handleKeyChange = (event, index) => {
        let newHeader = this.state.headers.map(item => { return ({ name: item.name, key: false }) })
        newHeader[index].key = event.target.value === 'on' ? true : false
        this.setState((prevState) => (
            {
                ...prevState,
                headers: newHeader
            }))
    }

    updateConfig = () => {
        this.setState((prevState) => (
            {
                ...prevState,
                updateConfig: !prevState.updateConfig
            }))
    }

    handleThumbnails = (e) => {
        this.searchConfig.searchThumbnailBasePath = e.target.value
    }

    handleRowDelete = (index) => {
        let newHeaders = this.state.headers

        if (index > -1) {


            newHeaders.splice(index, 1);
        }
        this.setState({
            ...this.state,
            headers: newHeaders
        })
    }

    handleCsvFile = async (event) => {
        CSVImportGetHeaders(event.target.files[0]).then(result => {

            this.setState((prevState) => ({
                ...prevState,
                mapCsvColumn: true,
                headers: result.map(item => { return ({ name: item, key: false }) }),
                csvFile: event.target.files[0]
            }))
        })

    }

    render() {
        console.log(this.state.headers, 'headers')


        return (

            this.state.loading ?
                <Spinner animation="grow" size='lg' />
                :
                <form onSubmit={this.handleSubmit} >
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <h3 style={{ paddingBottom: 10 }}>Text Search Form</h3>
                        {this.state.response.show &&
                            <Alert severity={this.state.response.variant} >
                                {this.state.response.msg}
                            </Alert>}

                        {!this.state.mapCsvColumn && !this.state.response.show &&
                            <>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Upload #CSV-Client-File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={this.handleCsvFile}
                                    />
                                </Button>
                                <Alert severity="info" style={{ maxWidth: 'fit-content', display: 'inline-flex' }}>
                                    Select comma delimiter
                                </Alert>
                            </>
                        }
                        {
                            this.state.mapCsvColumn &&
                            <>
                                <Alert severity="warning">
                                    -check if these headers are written correctly as in CSV!
                                    <br />
                                    -Key can only contain letters, digits
                                    <br />
                                    -At least one column should be named as 'id'
                                </Alert>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Column</TableCell>
                                                <TableCell >Key</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.headers.map((item, index) => {

                                                return (

                                                    <TableRow
                                                        key={item.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <TextField
                                                                key={item.name}
                                                                id="outlined"
                                                                onChange={(e) => this.handleHeaderChange(e, index)}
                                                                name={index}
                                                                defaultValue={item.name}
                                                                type="text"
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {<Form.Check inline type="radio" name="group1"
                                                                onChange={(e) => this.handleKeyChange(e, index)} required />}
                                                        </TableCell>
                                                        <TableCell>{
                                                            <Chip
                                                                label="Deletable"
                                                                index={index}
                                                                onClick={(e) => this.handleRowDelete(`${e.currentTarget.getAttribute('index')}`)}
                                                                deleteIcon={<DeleteIcon />}

                                                            />}</TableCell>

                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
                        {!this.state.response.show &&
                            <>
                                <hr />

                                <TextField
                                    id="outlined"
                                    label="Thumbnail Base Path"
                                    onChange={this.handleThumbnails}
                                    placeholder='*not required'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <hr />

                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox defaultChecked onChange={this.updateConfig} id='config-checkbox' />}
                                        label="Add text search to config.json" />
                                </FormGroup>
                            </>
                        }


                        <Button type="button" onClick={this.props.resetCurrentComponent}>Back</Button>
                        {!this.state.response.show && <Button type="submit" variant="contained">Submit</Button>}
                    </div>
                </form >




        )

    }

}