import { useState } from 'react'
import '../../style/App.css';
import { Typography, Grid, Button, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';
import { useForm } from '../../hooks/useForm';

const Input = styled('input')({
    display: 'none',
});

export default function ThemeForm(props) {

    const FormName = 'theme'

    //validations
    const [logoError, setLogoError] = useState(false)
    //const [supergraphicError, setSupergrahicError] = useState(false)

    //Form
    const [state, handleState, setValue] = useForm({
        
        image: '',
        supergraphic: process.env.REACT_APP_SUPERGRAPIC,
        buttonColor: '#1976d2',
        buttonTextColor: '#FFFFFF',
        menuColor: '#1976d2',
        menuTextColor: '#FFFFFF'
    })


    const isValid = () => {

        if (state.image == '') {
            setLogoError(true)
            return false
        }
        setLogoError(false)
        // if(state.supergraphic == '') {
        //     setSupergrahicError(true)
        //     return false
        // }
        // setSupergrahicError(false)

        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        // no procssing is needed for this form! 
        return state
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(state.supergraphic)
        console.log(state.image)
        if (!isValid()) return

        props.handleNext(FormName, processStateInput())

    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mt={1} mb={3}>

                <Grid item sm={12} md={12}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={handleState} name="image" />
                        <Button variant="contained" component="span"  >
                            Upload  #Logo-Login-Img
                        </Button>
                        <FormHelperText style={{ marginLeft: 15, color: 'red' }}>{logoError ? '*required' : null}</FormHelperText>
                    </label>
                </Grid>

{/* 
                <Grid item sm={12} md={6}>
                    <label htmlFor="contained-button-file1">
                        <Input accept="image/*" id="contained-button-file1" type="file" onChange={handleState} name="supergraphic" />
                        <Button variant="contained" component="span"  >
                            Upload #Supergraphic
                        </Button>
                        <FormHelperText style={{ marginLeft: 15, color: 'red' }}>{supergraphicError ? '*required' : null}</FormHelperText>
                    </label>
                </Grid> */}

              
                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Button-Color
                    </Typography>

                    <input type="color" className="ColorInput"
                        value={state.buttonColor} onChange={handleState} name="buttonColor" />

                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Button-Text-Color
                    </Typography>

                    <input type="color" className="ColorInput" value={state.buttonTextColor}
                        onChange={handleState} name="buttonTextColor" />

                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Menu-Color
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.menuColor} onChange={handleState} name="menuColor" />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Menu-Text-Color
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.menuTextColor} onChange={handleState} name="menuTextColor" />
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


















































