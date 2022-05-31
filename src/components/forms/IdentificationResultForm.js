import { useState } from 'react'
import '../../style/App.css';
import { TextField, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from '../../hooks/useForm';
import { FormControlLabel, Switch } from '@material-ui/core';

export default function IdentificationResultForm(props) {

    const FormName = 'identificationResults'

    //validations
    const [numberResultsError, setNumberResultsError] = useState(false)

    //Form
    const [state, handleState, setValue] = useForm({
        askForGeoLocation: false,
        numberOfVisibleResults: '50'
    })


    const isValid = () => {
        if (numberResultsError) return false

        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        // no processing before submit
        return state
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValid()) return

        props.handleNext(FormName, processStateInput())

    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mt={1} mb={3}>

                <Grid item sm={12} md={6}>
                    <TextField
                        id="filled-number"
                        label="Visible results"
                        type="number"
                        name="numberOfVisibleResults"
                        value={state.numberOfVisibleResults}
                        onChange={e => {
                            setNumberResultsError(false)
                            if (e.target.value < 10 || e.target.value > 100) {
                                setNumberResultsError(true)
                            }
                            handleState(e)
                        }
                        }
                        variant="filled"
                        size="small"
                        helperText="Enter value between 10 and 100"
                        error={numberResultsError}
                    />
                </Grid>

                <Grid item sm={12} md={6}>
                    <FormControlLabel control={<Switch onChange={() => {
                        setValue('askForGeoLocation', !state.askForGeoLocation)
                    }} name="askForGeoLocation" checked={state.askForGeoLocation} />} label="askForGeoLocation" />

                </Grid>


            </Grid>
            <Box sx={{ mb: 2, mt: 6 }}>
                <div>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {props.currentIndex === props.numSteps - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                        disabled={props.currentIndex === 0}
                        onClick={props.handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>

                </div>
            </Box>
        </form>

    );
}

