import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, TextField, Typography } from '@material-ui/core';
import { CheckBoxTranslation } from './CheckBoxTranslation';

export class FieldList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numItems: 0,
            showItems: false,
            showCheck: false,
            colError: false,
            showParent: false,

        };

    }

    handleShowParent = (e, isChecked) => {
        this.setState({
            ...this.state,
            showParent: isChecked
        })
    }

    handleShowItems = () => {
        if (!this.state.colError && this.state.numItems !== 0) {
            this.setState({
                ...this.state,
                showCheck: false,
                showItems: true,
            })
        }

    }


    handleChangeParent = (e, isInputChecked) => {
        this.setState({
            ...this.state,
            showCheck: isInputChecked,
            showParent: isInputChecked,
            numItems: 0,
        })

    }

    handleNumItems = (bol, num) => {
        this.setState({
            ...this.state,
            colError: bol,
            numItems: num
        })
    }


    render() {
        let arr = []
        for (let i = 0; i < this.state.numItems; i++)
            arr.push(i)
        console.log(arr)
        const children = (
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3, flexWrap: 'wrap' }}>
                {

                    arr.map((_, i) => {
                        console.log(i)
                        return (
                            <CheckBoxTranslation
                                label={`Field-${i}`}
                                key={`Field-${i}`}
                                field={this.props.fieldName} 
                                state={this.props.fields}
                                en={this.props.en}
                                de={this.props.de}
                                index={`${i}`} />
                        )
                    })
                }
            </Box>
        );

        return (

            <div>
                <FormControlLabel
                    label={<Typography variant="overline" display="block" gutterBottom>
                        Fields
                    </Typography>}
                    control={
                        <Checkbox
                            checked={this.state.showParent}
                            onChange={this.handleChangeParent}
                            color="primary"
                        />
                    }
                />
                {this.state.showCheck ?
                    <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3, flexWrap: 'wrap' }}>
                        <TextField
                            id="filled-number"
                            label="Number of fields"
                            type="number"
                            onChange={e => {
                                if (e.target.value < 1 || e.target.value > 8) {
                                    this.handleNumItems(true, 0)
                                } else {
                                    this.handleNumItems(false, e.target.value)
                                }
                            }
                            }
                            variant="filled"
                            size="small"
                            helperText="Enter value between 1 and 8"
                            error={this.state.colError}
                        />
                        <Button size="small" onClick={this.handleShowItems}>Create</Button>
                    </Box>
                    : null}

                {this.state.showItems
                    && !this.state.showCheck
                    && this.state.showParent ?
                    children
                    : null}
            </div>
        )
    }
}

